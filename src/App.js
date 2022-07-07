import logo from './images/logodumbmerch.png';
import gambar from './images/gambarmas.png';
import mouse from './images/mouse.png';
import './App.css';

function App() {
  return (
    <div className="bg-black h-screen">
      <div className="flex justify-between items-center px-5">
        <img className=' w-[70px] mx-5 py-4 ml-10' src={logo} />
            <div>
            <ul className=' flex gap-2 font-bold '>
              <li className='text-white'>complain</li>
            <li className='text-red-500'>profile</li>
            <li className='text-white'>logout</li>

            </ul>
            </div>
            </div>
        <div className="flex flex-row ml-[86px] mt-[34px] " >
          <div>
            <p className='text-2xl font-bold text-[#F74D4D]'>My profile</p>
            <img className='w-{338px} mx-10 mt-5 ml-0' src={gambar} /></div>
          <div className='flex flex-col ml-5 w-[355px] mt-[47px]'>
            <div className='text-lg'>
              <div className=' text-red-500'>Name</div>
              <div className='text-white'>Yosep</div>
            </div> <div className='text-lg'>
              <div className=' text-red-500'>Email</div>
              <div className='text-white'>yosepgans@gmail.com</div>
            </div>
            <div className='text-lg'>
              <div className=' text-red-500'>Phone</div>
              <div className='text-white'>083896833122</div>
            </div>
            <div className='text-lg'>
              <div className=' text-red-500'>Gender</div>
              <div className='text-white'>Male</div>
            </div>
            <div className='text-lg'>
              <div className=' text-red-500'>Adress</div>
              <div className='text-white'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </div>
            </div>

          </div>
          <div>
          <div className='font-bold text-2xl text-red-500 flex flex-row'>My Transaction</div>
          <div className=" flex flex-row bg-[#303030] w-[524px] mt-[42px] mr-[80px]">
            <div className='flex flex-row'>

            <img className=' flex flex-col w-[80px] h-[145px] mt-[14px] ml-[28px]'src={mouse}></img>
            <div className='ml-[13px] '>
             <div className='text-sm text-red-500 font-bold mt-[19px]'>Mouse</div> 
             <div className='text-xs text-red-500 mt-[3px] w-[89px]'> Saturday, 14 juli 2021</div>
             <div className='text-xs text-white w-[82px]'>Price : Rp 500.000</div>
             <div className='text-xs font-bold text-white mt-[40px] ml-[13px] w-[91px] ' >Sub Total: Rp 500.000 </div></div>
             
           <img className='flex flex-col mr-[29px] w-[70px] h-[70px] mt-[28px] ml-[222px]'src={logo}></img>

            </div>
          </div></div>
        </div>
      </div>
    


  );
}

export default App;
