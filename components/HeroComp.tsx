import Logo from "./Logo";

export default function HeroComp({text}:{text:string}){
    return (
        <div className="flex flex-col mb-10">
            <Logo />
            <div className="mt-20 flex flex-col gap-5 ">
             <h1 className="text-white !my-10 text-center uppercase text-7xl md:text-9xl pl-2"> 
                 {text}
             </h1>
            </div>
        </div>
    )
}