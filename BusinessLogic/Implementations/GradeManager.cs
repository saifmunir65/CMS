using System.Collections.Generic;
using System.Threading.Tasks;
using BusinessLogic.DTOs;
using BusinessLogic.Interfaces;
using DataAccess.Repositories.Interfaces;
using DataAccess.Models;

namespace BusinessLogic.Implementations
{
    public  class GradeManager: IGradeManager
    {
        private IGradeDAL dal;
        private IGradeMapper mapper;

        public GradeManager(IGradeDAL dal, IGradeMapper mapper)
        {
            this.dal= dal;
            this.mapper = mapper;
        }

        public async Task<List<GradeDTO>> GetAll()
        {
            var result =  await dal.GetAll();
            var response = new List<GradeDTO>();

            foreach (var item in result)
            {
                response.Add(mapper.Map(item));
            }

            return response;
        }

        public  async Task<GradeDTO> Get(int id)
        {
            var Grade = await dal.Get(id);
            return mapper.Map(Grade);
        }

        public async Task<int> Delete(int id)
        {
            var entity = await dal.Get(id);
            return await dal.Delete(entity);
        }

        public async Task<int> Add(GradeDTO Grade)
        {
            var dbEntity = mapper.Map(new Grade(), Grade);
            return await dal.Add(dbEntity);
        }

        public async Task<int> Update(GradeDTO Grade)
        {
            var dbEntity = await dal.Get(Grade.Id);
            mapper.Map(dbEntity, Grade);
            return await dal.Update(dbEntity);
        }
    }
}
