import models.TestPerson;
import models.TestBeaconData;
import utest.Runner;
import utest.ui.Report;

class TestMain {
    public static function main() {
        var runner = new Runner();
        //application
        runner.addCase(new TestBeaconData());
        runner.addCase(new TestPerson());
        Report.create(runner);
        runner.run();
    }
}