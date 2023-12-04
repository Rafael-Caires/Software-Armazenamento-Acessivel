//using SGOO3.Data;

//namespace SGOO3.Repositories
//{
//    public class UnitOfWork : IUnitOfWork
//    {
//        private SystemParameterRepository systemParameterRepository;
//        public readonly ApplicationDbContext _context;

//        public UnitOfWork(ApplicationDbContext context)
//        {
//            this._context = context;
//        }

//        public ISystemParameterRepository SystemParameterRepository
//        {
//            get { return this.systemParameterRepository ??= new SystemParameterRepository(this._context); }
//        }
//    }
//}