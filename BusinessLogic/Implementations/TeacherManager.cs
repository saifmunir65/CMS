using System.Collections.Generic;
using System.Threading.Tasks;
using BusinessLogic.DTOs;
using BusinessLogic.Interfaces;
using DataAccess.Repositories.Interfaces;
using DataAccess.Models;

namespace BusinessLogic.Implementations
{
    public  class TeacherManager: ITeacherManager
    {
        private ITeacherDAL dal;
        private ITeacherMapper mapper;

        public TeacherManager(ITeacherDAL dal, ITeacherMapper mapper)
        {
            this.dal= dal;
            this.mapper = mapper;
        }

        public async Task<List<TeacherDTO>> GetAll()
        {
            var result =  await dal.GetAll();
            var response = new List<TeacherDTO>();

            foreach (var item in result)
            {
                response.Add(mapper.Map(item));
            }

            return response;
        }

        public  async Task<TeacherDTO> Get(int id)
        {
            var Teacher = await dal.Get(id);
            return mapper.Map(Teacher);
        }

        public async Task<int> Delete(int id)
        {
            var entity = await dal.Get(id);
            return await dal.Delete(entity);
        }

        public async Task<int> Add(TeacherDTO Teacher)
        {
            var dbEntity = mapper.Map(new Teacher(), Teacher);
            return await dal.Add(dbEntity);
        }

        public async Task<int> Update(TeacherDTO Teacher)
        {
            var dbEntity = await dal.Get(Teacher.Id);
            mapper.Map(dbEntity, Teacher);
            return await dal.Update(dbEntity);
        }
    }
}
