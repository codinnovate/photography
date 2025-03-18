import Image from "next/image";
import Logo from "./Logo";

export default function Hero(){
    return (
        <div className="flex flex-col mb-10">
            <Logo />
            <div className="mt-20 flex flex-col gap-5 ">
             <h1 className="text-white !my-10 text-center text-7xl md:text-9xl pl-2">
                OLA LIFESTYLE
              </h1>
            
             {/* <div className="flex flex-col md:flex-row  gap-5 bg-yellow p-5">
                <h2 className="max-w-3xl mx-auto">
                    Our approach is rooter in precision and elegance , turning each photography into a into a carefully crafted verse that resonates with artistic sophistication. the interplay of light and shadow coupled with the nuances expressions we capture , creates asymphony of visual elegance in every frame.
                </h2>
                <div className="flex items-center bg-black rounded-2xl p-4">
                    <h2 className="text-yellow uppercase">Where every shot is a meticulously composed stanza of visual poerty.</h2>
                    <button className="text-white min-w-[10em] uppercase transition-all hover:mt-1 font-bold p-4 rounded-2xl bg-blue">Contact us</button>
                </div>
             </div> */}
            </div>
        </div>
    )
}