using System.Collections.Generic;
using System.Threading.Tasks;
using BusinessLogic.DTOs;
using BusinessLogic.Interfaces;
using DataAccess.Repositories.Interfaces;
using DataAccess.Models;

namespace BusinessLogic.Implementations
{
    public  class ResultManager: IResultManager
    {
        private IResultDAL _dal;
        private IResultMapper mapper;

        public ResultManager(IResultDAL dal, IResultMapper mapper)
        {
            this._dal= dal;
            this.mapper = mapper;
        }

        public async Task<List<ResultDTO>> GetAll()
        {
            var result =  await _dal.GetAll();
            var response = new List<ResultDTO>();

            foreach (var item in result)
            {
                response.Add(mapper.Map(item));
            }

            return response;
        }

        public  async Task<ResultDTO> Get(int id)
        {
            var Result = await _dal.Get(id);
            return mapper.Map(Result);
        }

        public async Task<int> Delete(int id)
        {
            var entity = await _dal.Get(id);
            return await _dal.Delete(entity);
        }

        public async Task<int> Add(ResultDTO Result)
        {
            var dbEntity = mapper.Map(new Result(), Result);
            return await _dal.Add(dbEntity);
        }

        public async Task<int> Update(ResultDTO Result)
        {
            var dbEntity = await _dal.Get(Result.Id);
            mapper.Map(dbEntity, Result);
            return await _dal.Update(dbEntity);
        }
    }
}
