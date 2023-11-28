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
    public class SubjectsController : ApiController
    {
        private readonly ISubjectManager manager;
        private readonly IHubContext magniSyncHub;
        private readonly IMagniLogger logger;
        public SubjectsController(IMagniLogger logger, ISubjectManager manager)
        {
            this.manager = manager;
            this.magniSyncHub = GlobalHost.ConnectionManager.GetHubContext<MagniSyncHub>();
            this.logger = logger;
        }

        // GET: api/Subjects
        public async Task<IHttpActionResult> GetSubjects()
        {
            try
            {
                logger.Info("GetSubjects call started");
                var response = await manager.GetAll();
                logger.Info("GetSubjects call completed. Result:"+JsonSerializer.Serialize(response));
                return Ok(response);
            }
            catch (Exception ex)
            {
                logger.Error("GetSubjects call failed  Exception:" + ex.Message);
                return InternalServerError();
            }
        }

        // GET: api/Subjects/5
        [ResponseType(typeof(SubjectDTO))]
        public async Task<IHttpActionResult> GetSubject(int id)
        {
            try
            {
                logger.Info("GetSubject call started Id:"+id);
                var response = await manager.Get(id);
                if (response == null)
                {
                    logger.Info("GetSubject call completed. Result:" + "No content");
                    return NotFound();
                }

                logger.Info("GetSubject call completed. Result:" + JsonSerializer.Serialize(response));
                return Ok(response);
            }
            catch (Exception ex)
            {
                logger.Error("GetSubject call failed. Exception:" + ex.Message);
                return InternalServerError();
            }
        }

        // PUT: api/Subjects/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutSubject(int id, SubjectDTO Subject)
        {
            try
            {
                logger.Info("PutSubject call started Request:" + JsonSerializer.Serialize(Subject));
                if (!ModelState.IsValid)
                {
                    logger.Info("PutSubject call aborted due to invalid model state. Model state:" +JsonSerializer.Serialize(ModelState) );
                    return BadRequest(ModelState);
                }

                if (id != Subject.Id)
                {
                    logger.Info("PutSubject call aborted due to invalid request. Id:" + id);
                    return BadRequest();
                }

                var dbEntity = await manager.Get(id);
                if (dbEntity is null)
                {
                    logger.Info("PutSubject call aborted due to invalid request. No DB entity was found for the given Id:" + id);
                    return BadRequest();
                }

                await manager.Update(Subject);
                magniSyncHub.Clients.All.subjectsUpdated();
                logger.Info("PutSubject call completed successfully");
                return StatusCode(HttpStatusCode.NoContent);
            }
            catch (Exception ex)
            {
                logger.Error("PutSubject call failed. Exception:" + ex.Message);
                return InternalServerError();
            }

        }

        // POST: api/Subjects
        [ResponseType(typeof(SubjectDTO))]
        public async Task<IHttpActionResult> PostSubject(SubjectDTO request)
        {
            try
            {
                logger.Info("PostSubject call started. Request:" + JsonSerializer.Serialize(request));
                if (!ModelState.IsValid)
                {
                    logger.Info("PostSubject call aborted due to invalid model state. Model state:" + JsonSerializer.Serialize(ModelState));
                    return BadRequest(ModelState);
                }

                await manager.Add(request);
                magniSyncHub.Clients.All.subjectsUpdated();
                logger.Info("PostSubject call completed successfully");
                return CreatedAtRoute("DefaultApi", new { id = request.Id }, request);
            }
            catch (Exception ex)
            {
                logger.Error("PostSubject call failed. Exception:" + ex.Message);
                return InternalServerError();
            }

        }

        // DELETE: api/Subjects/5
        [ResponseType(typeof(SubjectDTO))]
        public async Task<IHttpActionResult> DeleteSubject(int id)
        {
            try
            {
                logger.Info("DeleteSubject call started. Id:" + id);
                var dbEntity = await manager.Get(id);
                if (dbEntity == null)
                {
                    logger.Info("DeleteSubject call completed. Result:Not found. No db entity was found to delete");
                    return NotFound();
                }

                await manager.Delete(id);
                magniSyncHub.Clients.All.subjectsUpdated();
                logger.Info("DeleteSubject call completed successfully for entity" + JsonSerializer.Serialize(dbEntity));
                return Ok();
            }
            catch (Exception ex)
            {
                logger.Error("DeleteSubject call failed. Exception:" + ex.Message);
                return InternalServerError();
            }

        }
    }
}