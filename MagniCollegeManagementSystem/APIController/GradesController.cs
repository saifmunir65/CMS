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
    public class GradesController : ApiController
    {
        private readonly IGradeManager manager;
        private readonly IHubContext magniSyncHub;
        private readonly IMagniLogger logger;
        public GradesController(IMagniLogger logger, IGradeManager manager)
        {
            this.manager = manager;
            this.magniSyncHub = GlobalHost.ConnectionManager.GetHubContext<MagniSyncHub>();
            this.logger = logger;
        }

        // GET: api/Grades
        public async Task<IHttpActionResult> GetGrades()
        {
            try
            {
                logger.Info("GetGrades call started");
                var response = await manager.GetAll();
                logger.Info("GetGrades call completed. Grade:"+JsonSerializer.Serialize(response));
                return Ok(response);
            }
            catch (Exception ex)
            {
                logger.Error("GetGrades call failed  Exception:" + ex.Message);
                return InternalServerError();
            }
        }

        // GET: api/Grades/5
        [ResponseType(typeof(GradeDTO))]
        public async Task<IHttpActionResult> GetGrade(int id)
        {
            try
            {
                logger.Info("GetGrade call started Id:"+id);
                var response = await manager.Get(id);
                if (response == null)
                {
                    logger.Info("GetGrade call completed. Grade:" + "No content");
                    return NotFound();
                }

                logger.Info("GetGrade call completed. Grade:" + JsonSerializer.Serialize(response));
                return Ok(response);
            }
            catch (Exception ex)
            {
                logger.Error("GetGrade call failed. Exception:" + ex.Message);
                return InternalServerError();
            }
        }

        // PUT: api/Grades/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutGrade(int id, GradeDTO Grade)
        {
            try
            {
                logger.Info("PutGrade call started Request:" + JsonSerializer.Serialize(Grade));
                if (!ModelState.IsValid)
                {
                    logger.Info("PutGrade call aborted due to invalid model state. Model state:" +JsonSerializer.Serialize(ModelState) );
                    return BadRequest(ModelState);
                }

                if (id != Grade.Id)
                {
                    logger.Info("PutGrade call aborted due to invalid request. Id:" + id);
                    return BadRequest();
                }

                var dbEntity = await manager.Get(id);
                if (dbEntity is null)
                {
                    logger.Info("PutGrade call aborted due to invalid request. No DB entity was found for the given Id:" + id);
                    return BadRequest();
                }

                await manager.Update(Grade);
                magniSyncHub.Clients.All.gradesUpdated();
                logger.Info("PutGrade call completed successfully");
                return StatusCode(HttpStatusCode.NoContent);
            }
            catch (Exception ex)
            {
                logger.Error("PutGrade call failed. Exception:" + ex.Message);
                return InternalServerError();
            }

        }

        // POST: api/Grades
        [ResponseType(typeof(GradeDTO))]
        public async Task<IHttpActionResult> PostGrade(GradeDTO request)
        {
            try
            {
                logger.Info("PostGrade call started. Request:" + JsonSerializer.Serialize(request));
                if (!ModelState.IsValid)
                {
                    logger.Info("PostGrade call aborted due to invalid model state. Model state:" + JsonSerializer.Serialize(ModelState));
                    return BadRequest(ModelState);
                }

                await manager.Add(request);
                magniSyncHub.Clients.All.gradesUpdated();
                logger.Info("PostGrade call completed successfully");
                return CreatedAtRoute("DefaultApi", new { id = request.Id }, request);
            }
            catch (Exception ex)
            {
                logger.Error("PostGrade call failed. Exception:" + ex.Message);
                return InternalServerError();
            }

        }

        // DELETE: api/Grades/5
        [ResponseType(typeof(GradeDTO))]
        public async Task<IHttpActionResult> DeleteGrade(int id)
        {
            try
            {
                logger.Info("DeleteGrade call started. Id:" + id);
                var dbEntity = await manager.Get(id);
                if (dbEntity == null)
                {
                    logger.Info("DeleteGrade call completed. Grade:Not found. No db entity was found to delete");
                    return NotFound();
                }

                await manager.Delete(id);
                magniSyncHub.Clients.All.gradesUpdated();
                logger.Info("DeleteGrade call completed successfully for entity" + JsonSerializer.Serialize(dbEntity));
                return Ok();
            }
            catch (Exception ex)
            {
                logger.Error("DeleteGrade call failed. Exception:" + ex.Message);
                return InternalServerError();
            }

        }
    }
}