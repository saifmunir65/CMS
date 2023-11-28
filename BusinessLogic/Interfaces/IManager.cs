using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLogic.Interfaces
{
    public  interface IManager<TEntityDto>
    {
        /// <summary>
        ///  Get all <see cref="TEntityDto"/>(s)
        /// </summary>
        /// <returns></returns>
        Task<List<TEntityDto>> GetAll();
        /// <summary>
        ///  Get a specific <see cref="TEntityDto"/> by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<TEntityDto> Get(int id);
        /// <summary>
        /// Delete a specific <see cref="TEntityDto"/>
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<int> Delete(int id);
        /// <summary>
        /// Add a new <see cref="TEntityDto"/>
        /// </summary>
        /// <param name="Teacher"></param>
        /// <returns></returns>
        Task<int> Add(TEntityDto dto);
        /// <summary>
        /// Update a specific <see cref="TEntityDto"/>
        /// </summary>
        /// <param name="Teacher"></param>
        /// <returns></returns>
        Task<int> Update(TEntityDto dto);
    }
}
