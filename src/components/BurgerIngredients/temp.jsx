<section className="flex pt-5">
<div className="flex">
  <Tab value="one" active={current === "one"} onClick={setCurrent}>
    <p>Булки</p>
    <div className="grid grid-cols">
      <p className="text-left">Булки</p>
      <div className="grid grid-cols-2">
      {data.filter((item) => {
          if (item.type === "bun") {
            const result = item;
            return result;
          }
        })
        .map((item) => (
          <div className="relative" key={item._id}>
            <Counter count={1} size="default" />
            <img src={item.image_large} alt={item.name} />
            <div className="flex items-center justify-center gap-2">
              <p className="card_price">{item.price}</p>
              <CurrencyIcon type="primary" />
            </div>
            <p className="pt-2">{item.name}</p>
          </div>
        ))}
      </div>

    </div>
  </Tab>
</div>
<Tab value="two" active={current === "two"} onClick={setCurrent}>
  <p>Соусы</p>
  {/* <div className="grid grid-cols-2">
    {data
      .filter((item) => {
        if (item.type === "sauce") {
          const result = item;
          return result;
        }
      })
      .map((item) => (
        <div className="relative" key={item._id}>
          <Counter count={1} size="default" />
          <img src={item.image_large} alt={item.name} />
          <div className="flex items-center justify-center gap-2">
            <p className="card_price">{item.price}</p>
            <CurrencyIcon type="primary" />
          </div>
          <p className="pt-2">{item.name}</p>
        </div>
      ))}
  </div> */}
</Tab>
<Tab value="three" active={current === "three"} onClick={setCurrent}>
  <p>Начинки</p>
  {/* <div className="grid grid-cols-2">
    {data
      .filter((item) => {
        if (item.type === "main") {
          const result = item;
          return result;
        }
      })
      .map((item) => (
        <div className="relative" key={item._id}>
          <Counter count={1} size="default" />
          <img src={item.image_large} alt={item.name} />
          <div className="flex items-center justify-center gap-2">
            <p className="card_price">{item.price}</p>
            <CurrencyIcon type="primary" />
          </div>
          <p className="pt-2">{item.name}</p>
        </div>
      ))}
  </div> */}
</Tab>
</section>