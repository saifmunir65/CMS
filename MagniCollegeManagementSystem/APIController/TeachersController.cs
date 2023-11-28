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
    public class TeachersController : ApiController
    {
        private readonly ITeacherManager manager;
        private readonly IHubContext magniSyncHub;
        private readonly IMagniLogger logger;
        public TeachersController(IMagniLogger logger, ITeacherManager manager)
        {
            this.manager = manager;
            this.magniSyncHub = GlobalHost.ConnectionManager.GetHubContext<MagniSyncHub>();
            this.logger = logger;
        }

        // GET: api/Teachers
        public async Task<IHttpActionResult> GetTeachers()
        {
            try
            {
                logger.Info("GetTeachers call started");
                var response = await manager.GetAll();
                logger.Info("GetTeachers call completed. Result:"+JsonSerializer.Serialize(response));
                return Ok(response);
            }
            catch (Exception ex)
            {
                logger.Error("GetTeachers call failed  Exception:" + ex.Message);
                return InternalServerError();
            }
        }

        // GET: api/Teachers/5
        [ResponseType(typeof(TeacherDTO))]
        public async Task<IHttpActionResult> GetTeacher(int id)
        {
            try
            {
                logger.Info("GetTeacher call started Id:"+id);
                var response = await manager.Get(id);
                if (response == null)
                {
                    logger.Info("GetTeacher call completed. Result:" + "No content");
                    return NotFound();
                }

                logger.Info("GetTeacher call completed. Result:" + JsonSerializer.Serialize(response));
                return Ok(response);
            }
            catch (Exception ex)
            {
                logger.Error("GetTeacher call failed. Exception:" + ex.Message);
                return InternalServerError();
            }
        }

        // PUT: api/Teachers/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutTeacher(int id, TeacherDTO Teacher)
        {
            try
            {
                logger.Info("PutTeacher call started Request:" + JsonSerializer.Serialize(Teacher));
                if (!ModelState.IsValid)
                {
                    logger.Info("PutTeacher call aborted due to invalid model state. Model state:" +JsonSerializer.Serialize(ModelState) );
                    return BadRequest(ModelState);
                }

                if (id != Teacher.Id)
                {
                    logger.Info("PutTeacher call aborted due to invalid request. Id:" + id);
                    return BadRequest();
                }

                var dbEntity = await manager.Get(id);
                if (dbEntity is null)
                {
                    logger.Info("PutTeacher call aborted due to invalid request. No DB entity was found for the given Id:" + id);
                    return BadRequest();
                }

                await manager.Update(Teacher);
                magniSyncHub.Clients.All.teachersUpdated();
                logger.Info("PutTeacher call completed successfully");
                return StatusCode(HttpStatusCode.NoContent);
            }
            catch (Exception ex)
            {
                logger.Error("PutTeacher call failed. Exception:" + ex.Message);
                return InternalServerError();
            }

        }

        // POST: api/Teachers
        [ResponseType(typeof(TeacherDTO))]
        public async Task<IHttpActionResult> PostTeacher(TeacherDTO request)
        {
            try
            {
                logger.Info("PostTeacher call started. Request:" + JsonSerializer.Serialize(request));
                if (!ModelState.IsValid)
                {
                    logger.Info("PostTeacher call aborted due to invalid model state. Model state:" + JsonSerializer.Serialize(ModelState));
                    return BadRequest(ModelState);
                }

                await manager.Add(request);
                magniSyncHub.Clients.All.teachersUpdated();
                logger.Info("PostTeacher call completed successfully");
                return CreatedAtRoute("DefaultApi", new { id = request.Id }, request);
            }
            catch (Exception ex)
            {
                logger.Error("PostTeacher call failed. Exception:" + ex.Message);
                return InternalServerError();
            }

        }

        // DELETE: api/Teachers/5
        [ResponseType(typeof(TeacherDTO))]
        public async Task<IHttpActionResult> DeleteTeacher(int id)
        {
            try
            {
                logger.Info("DeleteTeacher call started. Id:" + id);
                var dbEntity = await manager.Get(id);
                if (dbEntity == null)
                {
                    logger.Info("DeleteTeacher call completed. Result:Not found. No db entity was found to delete");
                    return NotFound();
                }

                await manager.Delete(id);
                magniSyncHub.Clients.All.teachersUpdated();
                logger.Info("DeleteTeacher call completed successfully for entity" + JsonSerializer.Serialize(dbEntity));
                return Ok();
            }
            catch (Exception ex)
            {
                logger.Error("DeleteTeacher call failed. Exception:" + ex.Message);
                return InternalServerError();
            }

        }
    }
}