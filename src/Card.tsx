function Card({name, url, onClick}: {name: string, url: string, onClick: (name: string) => void}) {

  return (
    <div className="card" onClick={() => onClick(name)}>
      <img className="cardPhoto" src={url} alt="" />
      <div>{`${name.charAt(0).toUpperCase()}${String(name).slice(1)}`}</div>
    </div>
  )
}

export default Card;