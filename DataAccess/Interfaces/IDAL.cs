using System.Collections.Generic;
using System.Threading.Tasks;

namespace DataAccess.Repositories.Interfaces
{
    public  interface IDAL<TEntity>
    {
        /// <summary>
        /// Get sll <see cref="TEntity"/>s
        /// </summary>
        /// <returns></returns>
        Task<List<TEntity>> GetAll();
        /// <summary>
        /// Get a specific <see cref="TEntity"/> by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<TEntity> Get(int id);
        /// <summary>
        ///  Delete a specific <see cref="TEntity"/>
        /// </summary>
        /// <param name="course"></param>
        /// <returns></returns>
        Task<int> Delete(TEntity entity);
        /// <summary>
        /// Add a new <see cref="TEntity"/>
        /// </summary>
        /// <param name="course"></param>
        /// <returns></returns>
        Task<int> Add(TEntity entity );
        /// <summary>
        /// Update a specific <see cref="TEntity"/>
        /// </summary>
        /// <param name="course"></param>
        /// <returns></returns>
        Task<int> Update(TEntity entity);

    }
}
