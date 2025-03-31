
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-id.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Property types
export type Property = {
  id: string;
  name: string;
  address: string;
  status: string;
  monthlyRevenue: number;
  monthlyExpenses: number;
};

// Property API calls
export const propertyApi = {
  // Get all properties
  getProperties: async (): Promise<Property[]> => {
    // This would normally be a Supabase query
    // For now, we'll return sample data
    return [
      {
        id: "1",
        name: "Beach House",
        address: "123 Ocean Ave, Miami, FL",
        status: "active",
        monthlyRevenue: 3200,
        monthlyExpenses: 850,
      },
      {
        id: "2",
        name: "City Apartment",
        address: "456 Main St, New York, NY",
        status: "active",
        monthlyRevenue: 2800,
        monthlyExpenses: 750,
      },
      {
        id: "3",
        name: "Mountain Cabin",
        address: "789 Pine Rd, Aspen, CO",
        status: "active",
        monthlyRevenue: 2500,
        monthlyExpenses: 600,
      },
    ];
    
    // When Supabase is properly set up, you would use:
    // const { data, error } = await supabase
    //   .from('properties')
    //   .select('*');
    // if (error) throw error;
    // return data as Property[];
  },

  // Get a single property by ID
  getPropertyById: async (id: string): Promise<Property | null> => {
    // This would normally be a Supabase query
    // For now, we'll use sample data
    const properties = await propertyApi.getProperties();
    return properties.find(p => p.id === id) || null;
    
    // When Supabase is properly set up, you would use:
    // const { data, error } = await supabase
    //   .from('properties')
    //   .select('*')
    //   .eq('id', id)
    //   .single();
    // if (error) throw error;
    // return data as Property;
  },

  // Add a new property
  addProperty: async (property: Omit<Property, 'id'>): Promise<Property> => {
    // This would normally be a Supabase insert
    // For now, we'll just return a mock property with a new ID
    return {
      id: Math.random().toString(36).substr(2, 9),
      ...property,
    };
    
    // When Supabase is properly set up, you would use:
    // const { data, error } = await supabase
    //   .from('properties')
    //   .insert(property)
    //   .select()
    //   .single();
    // if (error) throw error;
    // return data as Property;
  },
};
