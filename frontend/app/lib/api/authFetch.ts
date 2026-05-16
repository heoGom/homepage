import { authHeaders } from "./client";

let isRedirecting = false;
const pendingGetRequests = new Map<string, Promise<Response>>();

export async function authFetch(url: string, options?: RequestInit) {
  const requestOptions: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...(options?.headers || {}),
    },
  };

  if (isDeduplicatedGetRequest(requestOptions)) {
    const requestKey = createRequestKey(url, requestOptions);
    const pendingRequest = pendingGetRequests.get(requestKey);

    if (pendingRequest) {
      return (await pendingRequest).clone();
    }

    const request = fetchWithAuthHandling(url, requestOptions);
    pendingGetRequests.set(requestKey, request);

    try {
      return (await request).clone();
    } finally {
      pendingGetRequests.delete(requestKey);
    }
  }

  return fetchWithAuthHandling(url, requestOptions);
}

async function fetchWithAuthHandling(url: string, options: RequestInit) {
  const res = await fetch(url, options);

  if (await isAuthFailureResponse(res)) {
    if (isRedirecting) {
      throw new Error("Unauthorized");
    }

    isRedirecting = true;
    localStorage.removeItem("accessToken");

    alert("로그인이 만료되었습니다. 다시 로그인해주세요.");

    window.location.href = "/login";

    throw new Error("Unauthorized");
  }

  return res;
}

function isDeduplicatedGetRequest(options: RequestInit) {
  const method = options.method?.toUpperCase() ?? "GET";
  return method === "GET" && !options.body;
}

function createRequestKey(url: string, options: RequestInit) {
  return [options.method?.toUpperCase() ?? "GET", url, getAuthorizationHeader(options)].join(
    "::",
  );
}

function getAuthorizationHeader(options: RequestInit) {
  const headers = options.headers;

  if (headers instanceof Headers) {
    return headers.get("Authorization") ?? "";
  }

  if (Array.isArray(headers)) {
    return headers.find(([key]) => key.toLowerCase() === "authorization")?.[1] ?? "";
  }

  const headerRecord = headers as Record<string, string> | undefined;

  return headerRecord?.Authorization ?? headerRecord?.authorization ?? "";
}

async function isAuthFailureResponse(res: Response) {
  if (res.status === 401) {
    return true;
  }

  if (res.status !== 403) {
    return false;
  }

  try {
    const body = (await res.clone().json()) as { code?: string };
    return body.code === "AUTHENTICATION_FAILED";
  } catch {
    return false;
  }
}
