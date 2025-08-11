
-- Create orders table with complete workflow
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id UUID REFERENCES auth.users(id) NOT NULL,
  farmer_id UUID REFERENCES public.farmers(id),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'shipped', 'delivered', 'cancelled', 'refunded')),
  total DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  shipping_cost DECIMAL(10,2) DEFAULT 0,
  delivery_address TEXT,
  delivery_date DATE,
  delivery_method TEXT NOT NULL DEFAULT 'delivery' CHECK (delivery_method IN ('delivery', 'pickup')),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_method TEXT,
  notes TEXT,
  tracking_number TEXT,
  estimated_delivery TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_status_history table for tracking status changes
CREATE TABLE IF NOT EXISTS public.order_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  old_status TEXT,
  new_status TEXT NOT NULL,
  changed_by UUID REFERENCES auth.users(id),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_status_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for orders
CREATE POLICY "Users can view their own orders" ON public.orders
  FOR SELECT USING (auth.uid() = buyer_id);

CREATE POLICY "Farmers can view orders for their products" ON public.orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.farmers f 
      WHERE f.id = orders.farmer_id AND f.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create their own orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = buyer_id);

CREATE POLICY "Farmers can update orders for their products" ON public.orders
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.farmers f 
      WHERE f.id = orders.farmer_id AND f.user_id = auth.uid()
    )
  );

-- RLS Policies for order_items
CREATE POLICY "Users can view order items for their orders" ON public.order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders o 
      WHERE o.id = order_items.order_id AND o.buyer_id = auth.uid()
    )
  );

CREATE POLICY "Farmers can view order items for their orders" ON public.order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders o 
      JOIN public.farmers f ON f.id = o.farmer_id
      WHERE o.id = order_items.order_id AND f.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create order items for their orders" ON public.order_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders o 
      WHERE o.id = order_items.order_id AND o.buyer_id = auth.uid()
    )
  );

-- RLS Policies for order_status_history
CREATE POLICY "Users can view status history for their orders" ON public.order_status_history
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders o 
      WHERE o.id = order_status_history.order_id AND 
      (o.buyer_id = auth.uid() OR EXISTS (
        SELECT 1 FROM public.farmers f 
        WHERE f.id = o.farmer_id AND f.user_id = auth.uid()
      ))
    )
  );

CREATE POLICY "Authorized users can create status history" ON public.order_status_history
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders o 
      WHERE o.id = order_status_history.order_id AND 
      (o.buyer_id = auth.uid() OR EXISTS (
        SELECT 1 FROM public.farmers f 
        WHERE f.id = o.farmer_id AND f.user_id = auth.uid()
      ))
    )
  );

-- Create function to update order status with history tracking
CREATE OR REPLACE FUNCTION public.update_order_status(
  order_id UUID,
  new_status TEXT,
  notes TEXT DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  old_status TEXT;
  order_exists BOOLEAN;
BEGIN
  -- Get current status
  SELECT status INTO old_status FROM public.orders WHERE id = order_id;
  
  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;
  
  -- Update order status
  UPDATE public.orders 
  SET status = new_status, updated_at = NOW()
  WHERE id = order_id;
  
  -- Insert status history
  INSERT INTO public.order_status_history (order_id, old_status, new_status, changed_by, notes)
  VALUES (order_id, old_status, new_status, auth.uid(), notes);
  
  RETURN TRUE;
END;
$$;

-- Create trigger to automatically update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
