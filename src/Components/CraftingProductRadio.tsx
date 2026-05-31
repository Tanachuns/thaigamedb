
type Props = {
    resetError:Function,
    image:string,
    name: string,
    inputValue:string,
    inputName:string
}

export default function CraftingProductRadio(props: Props) {
console.log(props.image)
  return (
  <div className="tooltip z-20" data-tip={props.name}>
            <label className="cursor-pointer">
              <input
                onClick={() => props.resetError()}
                type="radio"
                name={props.inputName}
                value={props.inputValue}
                className="peer hidden"
              />

              <img
                src={props.image}
                alt={props.name}
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
  )
}