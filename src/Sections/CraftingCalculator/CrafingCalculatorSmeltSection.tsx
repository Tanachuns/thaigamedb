import { useState } from "react";
import products from "../../assets/data/CraftingCalculator.json";
import CraftingProductRadio from "../../Components/CraftingProductRadio";
import { getImage } from "../../Helpers/ImageHelper";


type Task = {
  name: string;
  amount: number;
};

type Result = {
  staminacost: number;
  tasks: Task[];
};

export default function CrafingCalculatorSmeltSection() {
  const [result, setResult] = useState<Result>({
    staminacost: 0,
    tasks: [],
  });

  const [errormsg, setErrorMsg] = useState<string | null>(null);
  const calHandler = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const productAmount: number = Number(event.target.product_amount.value);
    const smelt_product = event.target.smelt_product.value;

    if (!smelt_product) {
      setErrorMsg("กรุณาเลือก Enchance Material");
      return;
    }

    if (productAmount > 9999 || productAmount < 1) {
      setErrorMsg("ระบุจำนวนไม่ต่ำกว่า 0 และไม่เกิน 9,999 ");
      return;
    }

    const _result: Result = {
      staminacost: 0,
      tasks: [],
    };
    // =(((mat_cost/yield)*gat_cost)+...)+cft_cost
    const product = products.find((f) => f.name === smelt_product);
    product?.materials.forEach((m) => {
      const gather = m.mat_cost / m.yield * productAmount;
      _result.staminacost += gather * m.gat_cost;
      _result.tasks.push({ name: m.source, amount: gather });
    });
    _result.staminacost += product?.cft_cost as number;
    _result.staminacost *= productAmount;
    if (!_result.staminacost) {
      setErrorMsg("เกิดข้อผิดพลาด");
    }
    setResult(_result);
  };

  const resetError = () => {
    setErrorMsg(null);
  };

  const resetForm = () => {
    setResult({
      staminacost: 0,
      tasks: [],
    });
  };
  console.table(products[0].name)
  return (
    <div className=" m-2 p-4">
      <form onSubmit={(e) => calHandler(e)}>
        <h2 className="text-xl">Enchance Material</h2>
        <div className="grid gap-2 grid-cols-4 w-fit">
          {products.map((p,i)=>{
            return <CraftingProductRadio key={i} image={getImage(p.name)} inputName="smelt_product" inputValue={p.name} name={p.title} resetError={resetError}  />
          })}
        </div>
        จำนวน
        <div>
          <input
            onFocus={() => resetError()}
            type="number"
            defaultValue={1}
            name="product_amount"
            className="input input-primary w-25 text-center "
          />
        </div>
        <button type="submit" className="mt-1 btn btn-warning">
          คำนวน
        </button>
        <button
          type="reset"
          onClick={resetForm}
          className="ml-1 mt-1 btn btn-neutral"
        >
          reset
        </button>
        <p className="text-xs text-red-400 m-1">{errormsg ?? errormsg}</p>
      </form>
      <div className="divider"></div>
      <b>ผลลัพธ์</b>
      {result.tasks.map((m) => {
        return (
          <p>
           <b>{m.name}:</b> {m.amount} ครั้ง
          </p>
        );
      })}
      <p><b>Stermina ที่ใช้:</b> {result.staminacost}</p>
    </div>
  );
}
