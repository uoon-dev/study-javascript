const profile = function*(end, next, r) {
  const userid = yield $.post('member.php', {r}, next);
  let added = yield $.post('detail.php', {userid}, next);
  added = added.split(',');
  end({userid, nick: added[0], thumb: added[1]});
}

const executor = (end, gene, ...arg) => {
  const next = v => iter.next(v);
  const iter = gene(end, next, ...arg);
  iter.next();
}

executor(profile, console.log, 123);