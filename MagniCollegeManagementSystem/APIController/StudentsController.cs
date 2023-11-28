using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using BusinessLogic.Interfaces;
using MagniCollegeManagementSystem.Hubs;
using Microsoft.AspNet.SignalR;
using MagniCollegeManagementSystem.Common;
using BusinessLogic.DTOs;

namespace MagniCollegeManagementSystem.APIController
{
    public class StudentsController : ApiController
    {
        private readonly IStudentManager _baseManager;
        private readonly IHubContext magniSyncHub;
        private readonly IMagniLogger logger;
        public StudentsController(IMagniLogger logger, IStudentManager baseManager)
        {
            this._baseManager = baseManager;
            this.magniSyncHub = GlobalHost.ConnectionManager.GetHubContext<MagniSyncHub>();
            this.logger = logger;
        }

        // GET: api/Students
        public async Task<IHttpActionResult> GetStudents()
        {
            try
            {
                logger.Info("GetStudents call started");
                var response = await _baseManager.GetAll();
                logger.Info("GetStudents call completed. Result:"+JsonSerializer.Serialize(response));
                return Ok(response);
            }
            catch (Exception ex)
            {
                logger.Error("GetStudents call failed  Exception:" + ex.Message);
                return InternalServerError();
            }
        }

        // GET: api/Students/5
        [ResponseType(typeof(StudentDTO))]
        public async Task<IHttpActionResult> GetStudent(int id)
        {
            try
            {
                logger.Info("GetStudent call started Id:"+id);
                var response = await _baseManager.Get(id);
                if (response == null)
                {
                    logger.Info("GetStudent call completed. Result:" + "No content");
                    return NotFound();
                }

                logger.Info("GetStudent call completed. Result:" + JsonSerializer.Serialize(response));
                return Ok(response);
            }
            catch (Exception ex)
            {
                logger.Error("GetStudent call failed. Exception:" + ex.Message);
                return InternalServerError();
            }
        }

        // PUT: api/Students/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutStudent(int id, StudentDTO student)
        {
            try
            {
                logger.Info("PutStudent call started Request:" + JsonSerializer.Serialize(student));
                if (!ModelState.IsValid)
                {
                    logger.Info("PutStudent call aborted due to invalid model state. Model state:" +JsonSerializer.Serialize(ModelState) );
                    return BadRequest(ModelState);
                }

                if (id != student.Id)
                {
                    logger.Info("PutStudent call aborted due to invalid request. Id:" + id);
                    return BadRequest();
                }

                var dbEntity = await _baseManager.Get(id);
                if (dbEntity is null)
                {
                    logger.Info("PutStudent call aborted due to invalid request. No DB entity was found for the given Id:" + id);
                    return BadRequest();
                }

                await _baseManager.Update(student);
                magniSyncHub.Clients.All.studentsUpdated();
                logger.Info("PutStudent call completed successfully");
                return StatusCode(HttpStatusCode.NoContent);
            }
            catch (Exception ex)
            {
                logger.Error("PutStudent call failed. Exception:" + ex.Message);
                return InternalServerError();
            }

        }

        // POST: api/Students
        [ResponseType(typeof(StudentDTO))]
        public async Task<IHttpActionResult> PostStudent(StudentDTO request)
        {
            try
            {
                logger.Info("PostStudent call started. Request:" + JsonSerializer.Serialize(request));
                if (!ModelState.IsValid)
                {
                    logger.Info("PostStudent call aborted due to invalid model state. Model state:" + JsonSerializer.Serialize(ModelState));
                    return BadRequest(ModelState);
                }

                await _baseManager.Add(request);
                magniSyncHub.Clients.All.studentsUpdated();
                logger.Info("PostStudent call completed successfully");
                return CreatedAtRoute("DefaultApi", new { id = request.Id }, request);
            }
            catch (Exception ex)
            {
                logger.Error("PostStudent call failed. Exception:" + ex.Message);
                return InternalServerError();
            }

        }

        // DELETE: api/Students/5
        [ResponseType(typeof(StudentDTO))]
        public async Task<IHttpActionResult> DeleteStudent(int id)
        {
            try
            {
                logger.Info("DeleteStudent call started. Id:" + id);
                var dbEntity = await _baseManager.Get(id);
                if (dbEntity == null)
                {
                    logger.Info("DeleteStudent call completed. Result:Not found. No db entity was found to delete");
                    return NotFound();
                }

                await _baseManager.Delete(id);
                magniSyncHub.Clients.All.studentsUpdated();
                logger.Info("DeleteStudent call completed successfully for entity" + JsonSerializer.Serialize(dbEntity));
                return Ok();
            }
            catch (Exception ex)
            {
                logger.Error("DeleteStudent call failed. Exception:" + ex.Message);
                return InternalServerError();
            }

        }
    }
}