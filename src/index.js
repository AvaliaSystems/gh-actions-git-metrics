import * as d3 from 'd3';

import util from 'util';
import { exec } from 'child_process';

const exec2 = util.promisify(exec);

async function gitLog() {
  try {
      const { stdout, stderr } = await exec2('git log --no-merges --pretty=format:\'%h,"%f","%aN",%aE,%aI,"%cN",%cE,%cI\'');

      const header = 'hash,subject,author,email,date\n';
      const commits = d3.csvParse(header + stdout);

      const contributionsPerAuthor = d3.group(commits, d => d.name);
      const contributionsPerSubject = d3.flatRollup(commits, v => d3.max(v, d => d.date), d => d.subject);

      console.log(contributionsPerSubject);

  } catch (err) {
     console.error(err);
  };
};

gitLog();