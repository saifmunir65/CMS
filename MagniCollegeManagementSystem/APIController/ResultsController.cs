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
    public class ResultsController : ApiController
    {
        private readonly IResultManager manager;
        private readonly IHubContext magniSyncHub;
        private readonly IMagniLogger logger;
        public ResultsController(IMagniLogger logger, IResultManager manager)
        {
            this.manager = manager;
            this.magniSyncHub = GlobalHost.ConnectionManager.GetHubContext<MagniSyncHub>();
            this.logger = logger;
        }

        // GET: api/Results
        public async Task<IHttpActionResult> GetResults()
        {
            try
            {
                logger.Info("GetResults call started");
                var response = await manager.GetAll();
                logger.Info("GetResults call completed. Result:"+JsonSerializer.Serialize(response));
                return Ok(response);
            }
            catch (Exception ex)
            {
                logger.Error("GetResults call failed  Exception:" + ex.Message);
                return InternalServerError();
            }
        }

        // GET: api/Results/5
        [ResponseType(typeof(ResultDTO))]
        public async Task<IHttpActionResult> GetResult(int id)
        {
            try
            {
                logger.Info("GetResult call started Id:"+id);
                var response = await manager.Get(id);
                if (response == null)
                {
                    logger.Info("GetResult call completed. Result:" + "No content");
                    return NotFound();
                }

                logger.Info("GetResult call completed. Result:" + JsonSerializer.Serialize(response));
                return Ok(response);
            }
            catch (Exception ex)
            {
                logger.Error("GetResult call failed. Exception:" + ex.Message);
                return InternalServerError();
            }
        }

        // PUT: api/Results/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutResult(int id, ResultDTO Result)
        {
            try
            {
                logger.Info("PutResult call started Request:" + JsonSerializer.Serialize(Result));
                if (!ModelState.IsValid)
                {
                    logger.Info("PutResult call aborted due to invalid model state. Model state:" +JsonSerializer.Serialize(ModelState) );
                    return BadRequest(ModelState);
                }

                if (id != Result.Id)
                {
                    logger.Info("PutResult call aborted due to invalid request. Id:" + id);
                    return BadRequest();
                }

                var dbEntity = await manager.Get(id);
                if (dbEntity is null)
                {
                    logger.Info("PutResult call aborted due to invalid request. No DB entity was found for the given Id:" + id);
                    return BadRequest();
                }

                await manager.Update(Result);
                magniSyncHub.Clients.All.resultsUpdated();
                logger.Info("PutResult call completed successfully");
                return StatusCode(HttpStatusCode.NoContent);
            }
            catch (Exception ex)
            {
                logger.Error("PutResult call failed. Exception:" + ex.Message);
                return InternalServerError();
            }

        }

        // POST: api/Results
        [ResponseType(typeof(ResultDTO))]
        public async Task<IHttpActionResult> PostResult(ResultDTO request)
        {
            try
            {
                logger.Info("PostResult call started. Request:" + JsonSerializer.Serialize(request));
                if (!ModelState.IsValid)
                {
                    logger.Info("PostResult call aborted due to invalid model state. Model state:" + JsonSerializer.Serialize(ModelState));
                    return BadRequest(ModelState);
                }

                await manager.Add(request);
                magniSyncHub.Clients.All.resultsUpdated();
                logger.Info("PostResult call completed successfully");
                return CreatedAtRoute("DefaultApi", new { id = request.Id }, request);
            }
            catch (Exception ex)
            {
                logger.Error("PostResult call failed. Exception:" + ex.Message);
                return InternalServerError();
            }

        }

        // DELETE: api/Results/5
        [ResponseType(typeof(ResultDTO))]
        public async Task<IHttpActionResult> DeleteResult(int id)
        {
            try
            {
                logger.Info("DeleteResult call started. Id:" + id);
                var dbEntity = await manager.Get(id);
                if (dbEntity == null)
                {
                    logger.Info("DeleteResult call completed. Result:Not found. No db entity was found to delete");
                    return NotFound();
                }

                await manager.Delete(id);
                magniSyncHub.Clients.All.resultsUpdated();
                logger.Info("DeleteResult call completed successfully for entity" + JsonSerializer.Serialize(dbEntity));
                return Ok();
            }
            catch (Exception ex)
            {
                logger.Error("DeleteResult call failed. Exception:" + ex.Message);
                return InternalServerError();
            }

        }
    }
}