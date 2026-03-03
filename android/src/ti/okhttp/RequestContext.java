package ti.okhttp;

import org.appcelerator.kroll.KrollFunction;
import org.appcelerator.kroll.KrollModule;

public class RequestContext extends KrollModule {
    final KrollFunction success;
    final KrollFunction error;

    RequestContext(KrollFunction success, KrollFunction error) {
        this.success = success;
        this.error = error;
    }
}
