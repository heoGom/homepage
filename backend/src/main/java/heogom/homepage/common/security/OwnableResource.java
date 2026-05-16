package heogom.homepage.common.security;

public interface OwnableResource {

    ResourceType getResourceType();

    Long getResourceId();

    Long getOwnerUserId();
}
