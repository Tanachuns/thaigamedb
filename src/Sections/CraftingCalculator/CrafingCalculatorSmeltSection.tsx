import { useState } from "react";
import Weapon_Enhanced_Matal_I from "../../assets/images/Weapon_Enhanced_Matal_I.png";
import products from  "../../assets/data/CraftingCalculator.json";

type Props = {};

type Task = {
  name: string;
  amount: number;
};

type Result = {
  staminacost: number;
  tasks: Task[];
};

export default function CrafingCalculatorSmeltSection({}: Props) {
  const [result, setResult] = useState<Result>({
      staminacost: 0,
      tasks: [],
    });
  const calHandler=(event:React.SubmitEvent<HTMLFormElement>)=>{
    event.preventDefault();
    const productAmount:number = Number(event.target.product_amount.value);
    const smelt_product = event.target.smelt_product.value;
    
        
    const _result: Result = {
      staminacost: 0,
      tasks: [],
    };
    // =(((mat_cost/yield)*gat_cost)+...)+cft_cost
    const product = products.find(f=>f.name===smelt_product)
    product?.materials.forEach(m=>{
      const gather = Math.ceil(m.mat_cost/m.yield)*productAmount
      _result.staminacost+= gather*m.gat_cost
      _result.tasks.push({name:m.source,amount:gather})
    })
    _result.staminacost += product?.cft_cost as number;
    _result.staminacost *= productAmount


    setResult(_result)
  }
  return (
    <div className=" m-2 p-4">
      <form onSubmit={e=>calHandler(e)}>
      <h2 className="text-xl">Enchance Material</h2> 
        <div className="flex gap-2">
      
        <label className="cursor-pointer">
          <input type="radio" name="smelt_product" value={"Weapon_Enhanced_Matal_I"} className="peer hidden" />
          <img
            src={Weapon_Enhanced_Matal_I}
            alt="Weapon Enhanced Metal I"
            className="
              w-16 h-16 rounded
              border-2 border-transparent
              peer-checked:border-primary
              peer-checked:ring-2
              peer-checked:ring-primary
              transition
            "
          />
        </label>
      </div>
      จำนวน
      <div className="">
        <button className="btn btn-primary  font-bold">-</button><input type="number" defaultValue={1} name="product_amount"  className="input border-r-0 input-primary w-25 text-center " min={0} max={9999} /><button className="btn btn-primary font-bold">+</button>
      </div>
      <button type="submit"  className="mt-1 btn btn-warning">คำนวน</button>
      </form>
      <div className="divider"></div>
      <b>ผลลัพธ์</b>
      {result.tasks.map(m=>{
        return <p>{m.name}: {m.amount} ครั้ง</p>
      })}
      <p>Stermina ที่ใช้: {result.staminacost}</p>
    </div>
  );
}
