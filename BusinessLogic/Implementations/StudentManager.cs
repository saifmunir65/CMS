using System.Collections.Generic;
using System.Threading.Tasks;
using BusinessLogic.DTOs;
using BusinessLogic.Interfaces;
using DataAccess.Repositories.Interfaces;
using DataAccess.Models;

namespace BusinessLogic.Implementations
{
    public  class StudentManager: IStudentManager
    {
        private IStudentDAL dal;
        private IStudentMapper mapper;

        public StudentManager(IStudentDAL dal, IStudentMapper mapper)
        {
            this.dal= dal;
            this.mapper = mapper;
        }

        public async Task<List<StudentDTO>> GetAll()
        {
            var result =  await dal.GetAll();
            var response = new List<StudentDTO>();

            foreach (var item in result)
            {
                response.Add(mapper.Map(item));
            }

            return response;
        }

        public  async Task<StudentDTO> Get(int id)
        {
            var student = await dal.Get(id);
            return mapper.Map(student);
        }

        public async Task<int> Delete(int id)
        {
            var entity = await dal.Get(id);
            return await dal.Delete(entity);
        }

        public async Task<int> Add(StudentDTO student)
        {
            var dbEntity = mapper.Map(new Student(), student);
            return await dal.Add(dbEntity);
        }

        public async Task<int> Update(StudentDTO student)
        {
            var dbEntity = await dal.Get(student.Id);
            mapper.Map(dbEntity, student);
            return await dal.Update(dbEntity);
        }
    }
}
