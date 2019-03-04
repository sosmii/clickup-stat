module.exports = tasks => {
  // 自分がレビュアーのタスクを除外する
  tasks = tasks.filter(e => {
    return String(e.assignees[0].id) === process.env.MY_USER_ID}
  );

  const completedTasks = tasks.filter(e =>
    ["Closed", "accepted"].includes(e.status.status)
  );
  const inprogressTasks = tasks.filter(e =>
    ["in progress", "completed", "in review", "rejected"].includes(e.status.status)
  );
  const notStartedTasks = tasks.filter(e =>
    ["open", "pending"].includes(e.status.status)
  );

  const totalPoints = _calcPointsFromTaskObjects(tasks);
  const completedPoints = _calcPointsFromTaskObjects(completedTasks);
  const inprogressPoints = _calcPointsFromTaskObjects(inprogressTasks);
  const notStartedPoints = _calcPointsFromTaskObjects(notStartedTasks);

  return _convertToDesiredFormat(
    totalPoints,
    completedPoints,
    inprogressPoints,
    notStartedPoints
  );
};

function _convertMillisecondsToHours(milliSeconds) {
  return milliSeconds / (1000 * 60 * 60);
}

function _calcPointsFromTaskObjects(tasks) {
  if (!tasks || tasks.length === 0) return 0;

  let points = 0;
  tasks.forEach(e => {
    points += _convertMillisecondsToHours(e.time_estimate)
  });

  return points;
}

function _convertToDesiredFormat(
  totalPoints,
  completedPoints,
  inprogressPoints,
  notStartedPoints
) {
  return (
    `- 今スプリント(火-月)タスク消化状況\n` +
    `    - トータル: ${totalPoints}pt\n` +
    `    - 完了: ${completedPoints}pt\n` +
    `    - 進行中: ${inprogressPoints}pt\n` +
    `    - 未着手: ${notStartedPoints}pt\n`
  );
}
