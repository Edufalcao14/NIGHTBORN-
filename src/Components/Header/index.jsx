import Link from 'next/link';

const NAV_ITEMS = [
  { label: 'To Do List', href: '/' },
  { label: 'Create', href: '/Create' },
];

export const Header = () => {

  return (
    <header className={`fixed top-0 left-0 w-full z-50 h-24 flex items-center transition-all duration-300 pb-3 `}>
      <div className="container lg:p-0 mx-auto sm:px-6 flex justify-between items-center">
        <nav className={`flex justify-center  items-center h-full w-full `}>
          <div className="flex flex-row items-center  gap-10  mt-14">
            {NAV_ITEMS.map((item, index) => (
              <Link href={item.href} key={index} >
                <p className="text-black text-xl">{item.label}</p> 
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};
