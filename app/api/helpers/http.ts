import { appVersion } from "@/utils/deviceInfo";

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
  timeout?: number;
}

type Request = {
  path: string;
  options?: RequestOptions;
  baseUrl?: string;
};
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export const BASE_URL = "http://localhost:3000/api/v2";

const buildUrl = ({
  path,
  params,
  baseUrl = BASE_URL,
}: {
  path: string;
  params?: Record<string, string>;
  baseUrl: string;
}) => {
  const url = new URL(path, baseUrl);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.append(key, value);
    }
  }
  return url.toString();
};

async function invokeRequest<T>(
  method: HttpMethod,
  path: string,
  baseUrl: string,
  options: RequestOptions = {},
): Promise<T> {
  const { headers = {}, params, body, timeout = 10000 } = options;
  const url = buildUrl({ path, params, baseUrl });
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-app-version": appVersion,
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    clearTimeout(id);

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}, statusText: ${response.statusText}`,
      );
    }

    return response.json();
  } catch (error) {
    console.error(`Error in ${method} request to ${url}:`, error);
    throw error;
  }
}

class Api {
  get<T>(request: Request): Promise<T> {
    return invokeRequest<T>(
      "GET",
      request.path,
      request.baseUrl || BASE_URL,
      request.options,
    );
  }

  post<T>(request: Request): Promise<T> {
    return invokeRequest<T>(
      "POST",
      request.path,
      request.baseUrl || BASE_URL,
      request.options,
    );
  }

  put<T>(request: Request): Promise<T> {
    return invokeRequest<T>(
      "PUT",
      request.path,
      request.baseUrl || BASE_URL,
      request.options,
    );
  }

  delete<T>(request: Request): Promise<T> {
    return invokeRequest<T>(
      "DELETE",
      request.path,
      request.baseUrl || BASE_URL,
      request.options,
    );
  }
}

export const api = new Api();
