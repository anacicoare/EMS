interface EventPayloads {
    [key: string]: unknown; // Add an index signature
    [key: symbol]: unknown; // Add an index signature for symbol keys
    success: string;  // Event 'success' will have a payload of type string
    error: string;    // Event 'error' will have a payload of type string
    // Add other event types here if needed
}

import mitt from "mitt";

export const emitter = mitt<EventPayloads>();