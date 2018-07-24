// This is an alternative way to define components using decorators
import { Vue, Component, Prop } from 'vue-property-decorator';
import Card from '@/components/Card';
import { CommitSplit, Dict, WeekDayStats } from '@/types';
import Legend from '@/components/Legend';

@Component
export default class extends Vue {
  @Prop() weekdays!: CommitSplit<Dict<WeekDayStats>>;

  render() {
    const maxSum = Math.max(...Object.values(this.weekdays.sum).map(counts => counts.commitCount));

    const bars = [];
    for (let i = 0; i < 7; i += 1) {
      const key = i.toString();
      const sections: DataPoint[] = [
        { color: 'color-open', title: 'Open Source', value: this.weekdays.open[key].commitCount },
        { color: 'color-closed', title: 'Private', value: this.weekdays.closed[key].commitCount },
      ];
      bars.push(<Bar sections={sections} type={BarType.VERTICAL} />);
    }

    const xAxisLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(label => (
      <label>{label}</label>
    ));

    const yAxisLabels = [0, ~~(maxSum / 2), maxSum].map(label => (
      <label>{label.toLocaleString()}</label>
    ));

    const sections: DataPoint[] = [
      { color: 'color-open', title: 'Open Source', value: 'nothing' },
      { color: 'color-closed', title: 'Private', value: 'nothing' },
    ];

    return (
      <Card title="Weekday Comparison" class="weekday-comparison">

        <Legend class="weekday-comparison__legend" sections={sections} slot="footer" />
      </Card>
    );
  }
}