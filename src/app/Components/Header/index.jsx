import Link from 'next/link';

const NAV_ITEMS = [
  { label: 'To Do List', href: '/' },
  { label: 'Create', href: '/create' },
  { label: 'Update', href: '/update' },
  { label: 'Delete', href: '/delete' }  
];

export const Header = () => {

  return (
    <header className={`fixed top-0 left-0 w-full z-50 h-24 flex items-center transition-all duration-300 pb-3 `}>
      <div className="container lg:p-0 mx-auto sm:px-6 flex justify-between items-center">
        <h1 className="text-black text-xl ">To Do List</h1>
        <nav className={`flex-1 flex lg:justify-end justify-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 transform transition-transform duration-300 ease-in-out sm:static sm:bg-transparent sm:translate-x-0 sm:flex sm:items-center sm:gap-10`}>
          <div className="flex flex-col sm:flex-row items-center gap-10 sm:gap-10 mt-24 sm:mt-0 sm:mr-6">
            {NAV_ITEMS.map((item, index) => (
              <Link href={item.href} key={index} >
                <p className="text-black">{item.label}</p> 
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};
