using System.Collections.Generic;
using System.Threading.Tasks;

namespace DataAccess.Repositories.Interfaces
{
    public class BaseDAL<TEntity> : IDAL<TEntity> 
    {
        private IRepository<TEntity> repository;
        public BaseDAL(IRepository<TEntity> repository)
        {
              this.repository= repository;
        }
        public Task<List<TEntity>> GetAll()
        {
            return repository.GetAll();
        }

        public Task<TEntity> Get(int id)
        {
            return repository.Get(id);
        }

        public Task<int> Delete(TEntity entity)
        {
            return repository.Delete(entity);
        }

        public Task<int> Add(TEntity entity)
        {
            return repository.Add(entity);
        }

        public Task<int> Update(TEntity entity)
        {
            return repository.Update(entity);
        }
    }
}
