import { useState } from "react";
import products from "../../assets/data/CraftingCalculator.json";
import CraftingProductRadio from "../../Components/CraftingProductRadio";
import { getImage } from "../../Helpers/ImageHelper";

type Task = {
  name: string;
  source: string;
  times: number;
  amount: number;
};

type Result = {
  product: string | undefined;
  amount: number;
  staminacost: number;
  tasks: Task[];
};

export default function CrafingCalculatorSmeltSection() {
  const [result, setResult] = useState<Result>({
    product: "",
    amount: 0,
    staminacost: 0,
    tasks: [],
  });

  const [errormsg, setErrorMsg] = useState<string | null>(null);
  const calHandler = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const productAmount: number = Number(event.target.product_amount.value);
    const smelt_product = event.target.smelt_product.value;
    const cur_item = [
      event.target.cur_item_a.value,
      event.target.cur_item_b.value,
    ];

    if (!smelt_product) {
      setErrorMsg("กรุณาเลือก Enchance Material");
      return;
    }

    if (productAmount > 9999 || productAmount < 1) {
      setErrorMsg("ระบุจำนวนไม่ต่ำกว่า 0 และไม่เกิน 9,999 ");
      return;
    }

    const _result: Result = {
      product: smelt_product,
      amount: productAmount,
      staminacost: 0,
      tasks: [],
    };

    // =(((mat_cost/yield)*gat_cost)+...)+cft_cost
    const product = products.find((f) => f.name === smelt_product);
    product?.materials.forEach((m, i) => {
      const gather = Math.ceil(
        (m.mat_cost * productAmount - cur_item[i]) / m.yield,
      );
      //console.log(m.title+": "+gather)
      _result.staminacost += gather * m.gat_cost;
      //console.log(m.title+" staminacost: "+ m.gat_cost)
      _result.tasks.push({
        name: m.title,
        source: m.source,
        times: gather,
        amount: m.mat_cost * productAmount - cur_item[i],
      });
    });
    //console.log(" staminacost: "+ _result.staminacost)
    _result.staminacost += (product?.cft_cost as number) * productAmount;

    if (!_result.staminacost) {
      setErrorMsg("เกิดข้อผิดพลาด");
    }
    _result.product = product?.title;
    setResult(_result);
  };

  // const handleCurStemChanged = (
  //   e: React.FocusEvent<HTMLInputElement, Element>,
  // ) => {
  //   const amount = document.getElementById(
  //     "product_amount",
  //   ) as HTMLInputElement;

  //   const smelt_product = document.getElementById(
  //     "smelt_product",
  //   ) as HTMLInputElement;

  //      const cur_item_a = document.getElementById(
  //     "cur_item_a",
  //   ) as HTMLInputElement;
  //    const cur_item_b = document.getElementById(
  //     "cur_item_b",
  //   ) as HTMLInputElement;

  //    const cur_item = [
  //     cur_item_a.value,
  //     cur_item_b.value,
  //   ];

  //   let staminacost = 0

  //    const product = products.find((f) => f.name === smelt_product.value);
  //   product?.materials.forEach((m, i) => {
  //     const gather = Math.ceil(
  //       (m.mat_cost - Number(cur_item[i]) ) / m.yield,
  //     )
  //     staminacost += gather * m.gat_cost;
  //   });
  //   amount.value =  (Number(e.target.value)-staminacost).toLocaleString();
  // };

  const resetError = () => {
    setErrorMsg(null);
  };

  const resetForm = () => {
    setResult({
      product: "",
      amount: 0,
      staminacost: 0,
      tasks: [],
    });
  };
  return (
    <div className=" m-2 p-4">
      <form onSubmit={(e) => calHandler(e)}>
        <h2 className="text-xl">Enchance Material</h2>
        <div className="grid gap-2 grid-cols-4 w-fit">
          {products.map((p, i) => {
            return (
              <CraftingProductRadio
                key={i}
                image={getImage(p.name + ".png")}
                inputName="smelt_product"
                inputValue={p.name}
                name={p.title}
                resetError={resetError}
              />
            );
          })}
        </div>
        <details
          className="collapse bg-base-100 border border-base-300 p-2 w-fit"
          name="my-accordion-det-1"
        >
          <summary>คำนวนเพิ่ม</summary>
          {/* <label className="input">
            <input
              type="number"
              onBlur={(e) => handleCurStemChanged(e)}
              className="grow"
              placeholder="stamina ปัจจุบัน"
              name="cur_stamina"
            />
          </label> */}
          <label className="input mt-1">
            <input
              type="number"
              className="grow"
              placeholder="จำนวนไอเทมฝั่งซ้าย"
              name="cur_item_a"
              id="cur_item_a"

            />
          </label>
          <label className="input mt-1">
            <input
              type="number"
              className="grow"
              placeholder="จำนวนไอเทมฝั่งขวา"
              name="cur_item_b"
              id="cur_item_b"
            />
          </label>
        </details>
        จำนวน
        <div>
          <input
            onFocus={() => resetError()}
            type="number"
            defaultValue={1}
            name="product_amount"
            className="input input-primary w-25 text-center "
            id="product_amount"
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
      <b className="text-xl">ผลลัพธ์</b>
      <p>
        {result.product} {result.amount} ชิ้น
      </p>
      {result.tasks.map((m, i) => {
        return (
          <p key={i}>
            ใช้ <b>{m.name}:</b> {m.amount} ชิ้น หาจาก <b>{m.source}</b>{" "}
            {m.times} ครั้ง
          </p>
        );
      })}
      <p className="flex">
        <img
          src={getImage("jobstaminaicon.png")}
          alt="job stamina icon"
          className="w-5"
        />
        <b>Stermina ที่ใช้:</b> {result.staminacost}
      </p>
    </div>
  );
}
