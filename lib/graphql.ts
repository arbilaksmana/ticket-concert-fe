// GraphQL API client utility
const GRAPHQL_URL = "http://localhost:4000/graphql";

export async function graphqlRequest<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await response.json();

  if (json.errors) {
    throw new Error(json.errors[0]?.message || "GraphQL Error");
  }

  return json.data;
}

// Concert types
export interface Concert {
  id: string;
  title: string;
  venue: string;
  startAt: string;
  endAt: string;
  description: string | null;
  status: "DRAFT" | "PUBLISHED" | "ENDED";
  ticketTypes: TicketType[];
}

export interface TicketType {
  id: string;
  concertId: string;
  name: string;
  price: number;
  quotaTotal: number;
  quotaSold: number;
  salesStartAt: string;
  salesEndAt: string;
}

// Order types
export interface Order {
  id: string;
  userId: string;
  concertId: string;
  midtransOrderId: string;
  status: "PENDING" | "AWAITING_PAYMENT" | "PAID" | "CANCELLED" | "EXPIRED" | "REFUNDED";
  grossAmount: number;
  createdAt: string;
  expiresAt: string;
  concert: Concert;
  orderItems: OrderItem[];
  tickets: Ticket[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  ticketTypeId: string;
  qty: number;
  unitPrice: number;
  subtotal: number;
  ticketType: TicketType;
}

export interface Ticket {
  id: string;
  code: string;
  status: "ISSUED" | "USED" | "VOID";
  issuedAt: string;
  usedAt: string | null;
  concert: Concert;
  ticketType: TicketType;
}

// Queries
export const GET_PUBLISHED_CONCERTS = `
  query GetPublishedConcerts {
    publishedConcerts {
      id
      title
      venue
      startAt
      endAt
      description
      status
      ticketTypes {
        id
        name
        price
        quotaTotal
        quotaSold
      }
    }
  }
`;

export const GET_CONCERT_BY_ID = `
  query GetConcert($id: ID!) {
    concert(id: $id) {
      id
      title
      venue
      startAt
      endAt
      description
      status
      ticketTypes {
        id
        name
        price
        quotaTotal
        quotaSold
        salesStartAt
        salesEndAt
      }
    }
  }
`;

export const GET_ALL_CONCERTS = `
  query GetAllConcerts {
    concerts {
      id
      title
      venue
      startAt
      endAt
      description
      status
      ticketTypes {
        id
        name
        price
        quotaTotal
        quotaSold
      }
    }
  }
`;

export const GET_USER_ORDERS = `
  query GetUserOrders($userId: ID!) {
    userOrders(userId: $userId) {
      id
      midtransOrderId
      status
      grossAmount
      createdAt
      expiresAt
      concert {
        id
        title
        venue
        startAt
      }
      orderItems {
        id
        qty
        unitPrice
        subtotal
        ticketType {
          name
        }
      }
    }
  }
`;

export const GET_USER_TICKETS = `
  query GetUserTickets($userId: ID!) {
    userTickets(userId: $userId) {
      id
      code
      status
      issuedAt
      usedAt
      concert {
        id
        title
        venue
        startAt
      }
      ticketType {
        name
        price
      }
    }
  }
`;

// Mutations
export const CREATE_ORDER = `
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      id
      midtransOrderId
      status
      grossAmount
      createdAt
      expiresAt
      orderItems {
        id
        qty
        unitPrice
        subtotal
      }
    }
  }
`;

export const UPDATE_ORDER_STATUS = `
  mutation UpdateOrderStatus($id: ID!, $input: UpdateOrderStatusInput!) {
    updateOrderStatus(id: $id, input: $input) {
      id
      status
    }
  }
`;

