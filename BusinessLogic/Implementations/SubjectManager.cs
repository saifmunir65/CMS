using System.Collections.Generic;
using System.Threading.Tasks;
using BusinessLogic.DTOs;
using BusinessLogic.Interfaces;
using DataAccess.Repositories.Interfaces;
using DataAccess.Models;

namespace BusinessLogic.Implementations
{
    public  class SubjectManager: ISubjectManager
    {
        private ISubjectDAL _dal;
        private ISubjectMapper mapper;

        public SubjectManager(ISubjectDAL dal, ISubjectMapper mapper)
        {
            this._dal= dal;
            this.mapper = mapper;
        }

        public async Task<List<SubjectDTO>> GetAll()
        {
            var result =  await _dal.GetAll();
            var response = new List<SubjectDTO>();

            foreach (var item in result)
            {
                response.Add(mapper.Map(item));
            }

            return response;
        }

        public  async Task<SubjectDTO> Get(int id)
        {
            var Subject = await _dal.Get(id);
            return mapper.Map(Subject);
        }

        public async Task<int> Delete(int id)
        {
            var entity = await _dal.Get(id);
            return await _dal.Delete(entity);
        }

        public async Task<int> Add(SubjectDTO Subject)
        {
            var dbEntity = mapper.Map(new Subject(), Subject);
            return await _dal.Add(dbEntity);
        }

        public async Task<int> Update(SubjectDTO Subject)
        {
            var dbEntity = await _dal.Get(Subject.Id);
            mapper.Map(dbEntity, Subject);
            return await _dal.Update(dbEntity);
        }
    }
}
