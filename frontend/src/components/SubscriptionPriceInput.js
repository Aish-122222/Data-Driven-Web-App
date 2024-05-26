import { useAppContext } from "../App";

export default function SubscriptionPriceInput() {
    const { basePrice, setBasePrice, pricePerCreditLine, setPricePerCreditLine, pricePerCreditScorePoint, setPricePerCreditScorePoint }
        = useAppContext();
    return (<div className="flex my-4 gap-3 items-center">
        <div className="flex flex-col gap-2 bg-gray-100 p-4 border w-fit">
            <div>Subscription Input</div>
            <InputBox value={basePrice} setValue={setBasePrice} label={"Base Price"} />
            <InputBox value={pricePerCreditLine} setValue={setPricePerCreditLine} label={"Price Per Credit Score Point"} />
            <InputBox value={pricePerCreditScorePoint} setValue={setPricePerCreditScorePoint} label={"Price Per Credit Score Point"} />
        </div>
        <div className="max-w-[250px] text-sm font-light ">
            The Subscription Input will determine the "Subscription Price" for each row in table.
        </div>
    </div>);
}

const InputBox = ({ value, setValue, label }) => {
    return (<div className="flex flex-col">
        <label className="font-semibold text-xs">{label}</label>
        <input type="number" value={value} onChange={(e) => setValue(parseInt(e.target.value))} className="bg-gray-600 px-2 rounded text-white" />
    </div>);
}