function ScoreBoard ( { score }: { score: number } ){
  return (
    <>
      <div className="scoreboard">
        Score: {score}
      </div>
    </>
  )
}

export default ScoreBoard;