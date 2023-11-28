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
    public class CoursesController : ApiController
    {
        private readonly ICourseManager manager;
        private readonly IHubContext magniSyncHub;
        private readonly IMagniLogger logger;
        public CoursesController(IMagniLogger logger, ICourseManager manager)
        {
            this.manager = manager;
            this.magniSyncHub = GlobalHost.ConnectionManager.GetHubContext<MagniSyncHub>();
            this.logger = logger;
        }

        // GET: api/Courses
        public async Task<IHttpActionResult> GetCourses()
        {
            try
            {
                logger.Info("GetCourses call started");
                var response = await manager.GetAll();
                logger.Info("GetCourses call completed. Course:"+JsonSerializer.Serialize(response));
                return Ok(response);
            }
            catch (Exception ex)
            {
                logger.Error("GetCourses call failed  Exception:" + ex.Message);
                return InternalServerError();
            }
        }

        // GET: api/Courses/5
        [ResponseType(typeof(CourseDTO))]
        public async Task<IHttpActionResult> GetCourse(int id)
        {
            try
            {
                logger.Info("GetCourse call started Id:"+id);
                var response = await manager.Get(id);
                if (response == null)
                {
                    logger.Info("GetCourse call completed. Course:" + "No content");
                    return NotFound();
                }

                logger.Info("GetCourse call completed. Course:" + JsonSerializer.Serialize(response));
                return Ok(response);
            }
            catch (Exception ex)
            {
                logger.Error("GetCourse call failed. Exception:" + ex.Message);
                return InternalServerError();
            }
        }

        // PUT: api/Courses/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutCourse(int id, CourseDTO Course)
        {
            try
            {
                logger.Info("PutCourse call started Request:" + JsonSerializer.Serialize(Course));
                if (!ModelState.IsValid)
                {
                    logger.Info("PutCourse call aborted due to invalid model state. Model state:" +JsonSerializer.Serialize(ModelState) );
                    return BadRequest(ModelState);
                }

                if (id != Course.Id)
                {
                    logger.Info("PutCourse call aborted due to invalid request. Id:" + id);
                    return BadRequest();
                }

                var dbEntity = await manager.Get(id);
                if (dbEntity is null)
                {
                    logger.Info("PutCourse call aborted due to invalid request. No DB entity was found for the given Id:" + id);
                    return BadRequest();
                }

                await manager.Update(Course);
                magniSyncHub.Clients.All.coursesUpdated();
                logger.Info("PutCourse call completed successfully");
                return StatusCode(HttpStatusCode.NoContent);
            }
            catch (Exception ex)
            {
                logger.Error("PutCourse call failed. Exception:" + ex.Message);
                return InternalServerError();
            }

        }

        // POST: api/Courses
        [ResponseType(typeof(CourseDTO))]
        public async Task<IHttpActionResult> PostCourse(CourseDTO request)
        {
            try
            {
                logger.Info("PostCourse call started. Request:" + JsonSerializer.Serialize(request));
                if (!ModelState.IsValid)
                {
                    logger.Info("PostCourse call aborted due to invalid model state. Model state:" + JsonSerializer.Serialize(ModelState));
                    return BadRequest(ModelState);
                }

                await manager.Add(request);
                magniSyncHub.Clients.All.coursesUpdated();
                logger.Info("PostCourse call completed successfully");
                return CreatedAtRoute("DefaultApi", new { id = request.Id }, request);
            }
            catch (Exception ex)
            {
                logger.Error("PostCourse call failed. Exception:" + ex.Message);
                return InternalServerError();
            }

        }

        // DELETE: api/Courses/5
        [ResponseType(typeof(CourseDTO))]
        public async Task<IHttpActionResult> DeleteCourse(int id)
        {
            try
            {
                logger.Info("DeleteCourse call started. Id:" + id);
                var dbEntity = await manager.Get(id);
                if (dbEntity == null)
                {
                    logger.Info("DeleteCourse call completed. Course:Not found. No db entity was found to delete");
                    return NotFound();
                }

                await manager.Delete(id);
                magniSyncHub.Clients.All.coursesUpdated();
                logger.Info("DeleteCourse call completed successfully for entity" + JsonSerializer.Serialize(dbEntity));
                return Ok();
            }
            catch (Exception ex)
            {
                logger.Error("DeleteCourse call failed. Exception:" + ex.Message);
                return InternalServerError();
            }

        }
    }
}