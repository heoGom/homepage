package heogom.homepage.common.security;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class SecurityEventLogger {

    public void unauthorizedAccess(OwnableResource resource, Long actorUserId, SecurityAction action) {
        log.warn(
                "Unauthorized access attempt. resourceType={}, resourceId={}, action={}, ownerUserId={}, actorUserId={}",
                resource.getResourceType(),
                resource.getResourceId(),
                action,
                resource.getOwnerUserId(),
                actorUserId
        );
    }
}
