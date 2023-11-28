using System.Collections.Generic;
using System.Threading.Tasks;
using BusinessLogic.DTOs;
using BusinessLogic.Interfaces;
using DataAccess.Repositories.Interfaces;
using DataAccess.Models;

namespace BusinessLogic.Implementations
{
    public  class CourseManager: ICourseManager
    {
        private ICourseDAL dal;
        private ICourseMapper mapper;

        public CourseManager(ICourseDAL dal, ICourseMapper mapper)
        {
            this.dal= dal;
            this.mapper = mapper;
        }

        public async Task<List<CourseDTO>> GetAll()
        {
            var result =  await dal.GetAll();
            var response = new List<CourseDTO>();

            foreach (var item in result)
            {
                response.Add(mapper.Map(item));
            }

            return response;
        }

        public  async Task<CourseDTO> Get(int id)
        {
            var Course = await dal.Get(id);
            return mapper.Map(Course);
        }

        public async Task<int> Delete(int id)
        {
            var entity = await dal.Get(id);
            return await dal.Delete(entity);
        }

        public async Task<int> Add(CourseDTO Course)
        {
            var dbEntity = mapper.Map(new Course(), Course);
            return await dal.Add(dbEntity);
        }

        public async Task<int> Update(CourseDTO Course)
        {
            var dbEntity = await dal.Get(Course.Id);
            mapper.Map(dbEntity, Course);
            return await dal.Update(dbEntity);
        }
    }
}
