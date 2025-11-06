import Form from 'next/form'
import InputBox from './input-box';
export default function Login() {

    const login = () => {
        console.log("Logging in")
    }

    return(
        <div className="">
            <div className="shadow shadow-gray-400 mt-64 ml-60 w-[464px] h-[666px] bg-white rounded-[3.5rem]">
                <div className='flex justify-center h-full w-full items-center'>
                    <div>
                        <InputBox></InputBox>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}