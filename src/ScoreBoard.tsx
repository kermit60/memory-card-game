function ScoreBoard ( { text, score }: { text: string, score: number } ){
  return (
    <>
      <div className="scoreboard">
        {text}{score}
      </div>
    </>
  )
}

export default ScoreBoard;