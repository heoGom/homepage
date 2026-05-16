package heogom.homepage.common.security;

import heogom.homepage.common.exception.BusinessException;
import heogom.homepage.common.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
@RequiredArgsConstructor
public class OwnershipValidator {

    private final SecurityEventLogger securityEventLogger;

    public void validate(OwnableResource resource, Long actorUserId, SecurityAction action, ErrorCode errorCode) {
        if (!Objects.equals(resource.getOwnerUserId(), actorUserId)) {
            securityEventLogger.unauthorizedAccess(resource, actorUserId, action);
            throw new BusinessException(errorCode);
        }
    }
}
