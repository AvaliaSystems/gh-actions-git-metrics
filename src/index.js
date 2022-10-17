import * as d3 from 'd3';
import { spawn } from 'child_process';
import * as fs from 'fs';

async function gitLog() {
  const gitlog = fs.createWriteStream('output/git.log', { flags: 'w' });
  const giterr = fs.createWriteStream('output/git.err', { flags: 'w' });
  const header = 'hash,subject,author_name,author_email,date\n';
  gitlog.write(header);
  const cmd = spawn('git', ['-C', process.env.GITHUB_WORKSPACE, 'log', '--no-merges', '--pretty=format:\'%h,"%f","%aN",%aE,%aI\'']);
  cmd.stdout.pipe(gitlog);
  cmd.stderr.pipe(giterr);


  let gitData = header;
  cmd.stdout.on('data', (data) => {
    gitData += data;
  });
  
  cmd.on('close', async (code) => {
    console.log('git log executed, data:');
    console.log(gitData);
    console.log('EOD');
    try {

      await fs.promises.writeFile(process.env.GITHUB_WORKSPACE + '/output/git-commits.csv', gitData);

      const commits = d3.csvParse(gitData);

      const commitsPerAuthor = d3.flatRollup(
        commits,
        (v) => v.length,
        (d) => d.author_name,
      );
      const commitsPerAuthorHeader = 'author_name,commits\n';
      await fs.promises.writeFile(process.env.GITHUB_WORKSPACE + '/output/git-authors.csv', commitsPerAuthorHeader + d3.csvFormatBody(commitsPerAuthor));

      const commitsPerAuthorPerMonth = d3.flatRollup(
        commits,
        (v) => v.length,
        (d) => d.author_name,
        (d) => d.date.substring(0, 7)
      );
      const commitsPerAuthorPerMonthHeader = 'author_name,commits,month\n';
      await fs.promises.writeFile(process.env.GITHUB_WORKSPACE + '/output/git-authors-per-month.csv', commitsPerAuthorPerMonthHeader + d3.csvFormatBody(commitsPerAuthorPerMonth));

      const commitsPerMonth = d3.flatRollup(
        commits,
        (v) => v.length,
        (d) => d.date.substring(0, 7)
      );
      const commitsPerMonthHeader = 'month,commits\n';
      await fs.promises.writeFile(process.env.GITHUB_WORKSPACE + '/output/git-commits-per-month.csv', commitsPerMonthHeader + d3.csvFormatBody(commitsPerMonth));

      const commitsPerMonthPerAuthor = d3.flatRollup(
        commits,
        (v) => v.length,
        (d) => d.date.substring(0, 7),
        (d) => d.author_name,
      );
      const commitsPerMonthPerAuthorHeader = 'month,author_name,commits\n';
      await fs.promises.writeFile(process.env.GITHUB_WORKSPACE + '/output/git-commits-per-month-per-author.csv', commitsPerMonthPerAuthorHeader + d3.csvFormatBody(commitsPerMonthPerAuthor));

      const authorsPerMonth = d3.hierarchy(d3.rollup(
        commits,
        v => v.length,
        (d) => d.date.substring(0, 7),
        (d) => d.author_name,
      ));

      /*
      const authorsPerMonthStats = authorsPerMonth.children.map(m => { return { month: m.data[0], authors: m.children.length } });
      const authorsPerMonthHeader = 'month,authors\n';
      await fs.promises.writeFile('output/git-authors-per-month.csv', authorsPerMonthHeader + d3.csvFormatBody(authorsPerMonthStats));
      */

      /*
      authorsPerMonth.children.forEach((month) => {
        console.log('\nProcessing month ' + month.data);
        month.children.forEach( (author_name) => { console.log(  'Processing author '  + author_name.data[0] + ' - ' + author_name.data[1])})
      })
      */
    } catch (err) {
      console.error(err);
    }
  });
}

gitLog();

// contributors / month
// contributions / contributor
