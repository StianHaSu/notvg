export default function InputBox() {
    return (
        <div className="w-[420px] h-10 border border-black rounded-3xl">
            <div className="w-full h-full ">
                <input 
                    className="rounded-3xl h-full w-full placeholder:text-center placeholder:text-black"
                    placeholder="Skriv inn e-postadressen din"
                />
            </div>
        </div>
    )
}