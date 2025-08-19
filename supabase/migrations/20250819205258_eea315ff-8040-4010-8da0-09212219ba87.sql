
-- Insérer des données de démonstration pour l'application AgriMarket

-- 1. Insérer des catégories de produits
INSERT INTO categories (id, name) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Légumes'),
('550e8400-e29b-41d4-a716-446655440002', 'Fruits'),
('550e8400-e29b-41d4-a716-446655440003', 'Céréales'),
('550e8400-e29b-41d4-a716-446655440004', 'Légumineuses'),
('550e8400-e29b-41d4-a716-446655440005', 'Produits laitiers'),
('550e8400-e29b-41d4-a716-446655440006', 'Épices et herbes')
ON CONFLICT (id) DO NOTHING;

-- 2. Créer des utilisateurs de démonstration (profils)
INSERT INTO profiles (id, first_name, last_name, phone, role, address, created_at) VALUES
-- Agriculteurs
('550e8400-e29b-41d4-a716-446655440010', 'Kouadio', 'Yao', '+225 07 12 34 56', 'farmer', 'Yamoussoukro, Côte d''Ivoire', now()),
('550e8400-e29b-41d4-a716-446655440011', 'Aminata', 'Traoré', '+225 05 98 76 54', 'farmer', 'Bouaké, Côte d''Ivoire', now()),
('550e8400-e29b-41d4-a716-446655440012', 'Jean-Baptiste', 'Koffi', '+225 01 23 45 67', 'farmer', 'Korhogo, Côte d''Ivoire', now()),
('550e8400-e29b-41d4-a716-446655440013', 'Fatou', 'Diabaté', '+225 07 89 12 34', 'farmer', 'San-Pédro, Côte d''Ivoire', now()),
('550e8400-e29b-41d4-a716-446655440014', 'Olivier', 'N''Guessan', '+225 05 56 78 90', 'farmer', 'Daloa, Côte d''Ivoire', now()),
('550e8400-e29b-41d4-a716-446655440015', 'Mariam', 'Coulibaly', '+225 01 34 56 78', 'farmer', 'Man, Côte d''Ivoire', now()),
('550e8400-e29b-41d4-a716-446655440016', 'Pierre', 'Brou', '+225 07 65 43 21', 'farmer', 'Abengourou, Côte d''Ivoire', now()),
('550e8400-e29b-41d4-a716-446655440017', 'Aïcha', 'Ouattara', '+225 05 11 22 33', 'farmer', 'Boundiali, Côte d''Ivoire', now()),
('550e8400-e29b-41d4-a716-446655440018', 'Marcel', 'Akissi', '+225 01 44 55 66', 'farmer', 'Grand-Bassam, Côte d''Ivoire', now()),
('550e8400-e29b-41d4-a716-446655440019', 'Salimata', 'Doumbia', '+225 07 77 88 99', 'farmer', 'Gagnoa, Côte d''Ivoire', now()),
-- Acheteurs
('550e8400-e29b-41d4-a716-446655440020', 'Martin', 'Pasquier', '+225 05 12 34 56', 'buyer', 'Cocody, Abidjan', now()),
('550e8400-e29b-41d4-a716-446655440021', 'Sophie', 'Dubois', '+225 01 98 76 54', 'buyer', 'Plateau, Abidjan', now()),
('550e8400-e29b-41d4-a716-446655440022', 'Thomas', 'Leroy', '+225 07 23 45 67', 'buyer', 'Marcory, Abidjan', now()),
('550e8400-e29b-41d4-a716-446655440023', 'Lucie', 'Martin', '+225 05 89 12 34', 'buyer', 'Treichville, Abidjan', now()),
('550e8400-e29b-41d4-a716-446655440024', 'David', 'Bernard', '+225 01 56 78 90', 'buyer', 'Yopougon, Abidjan', now()),
-- Admin
('550e8400-e29b-41d4-a716-446655440025', 'Admin', 'AgriMarket', '+225 07 00 00 00', 'admin', 'Abidjan, Côte d''Ivoire', now())
ON CONFLICT (id) DO NOTHING;

-- 3. Insérer les profils d'agriculteurs
INSERT INTO farmers (id, user_id, name, farm_name, description, location, address, phone, latitude, longitude, is_certified, rating, reviews_count, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440010', 'Kouadio Yao', 'Ferme des Ignames d''Or', 'Spécialisé dans la culture d''ignames et de manioc bio depuis 15 ans', 'Yamoussoukro', 'Route de Tiébissou, Yamoussoukro', '+225 07 12 34 56', 6.8276, -5.2893, true, 4.5, 12, now()),
('550e8400-e29b-41d4-a716-446655440031', '550e8400-e29b-41d4-a716-446655440011', 'Aminata Traoré', 'Jardin de Mama Aminata', 'Production de légumes verts et d''épices traditionnelles', 'Bouaké', 'Quartier Koko, Bouaké', '+225 05 98 76 54', 7.6944, -5.0300, true, 4.8, 18, now()),
('550e8400-e29b-41d4-a716-446655440032', '550e8400-e29b-41d4-a716-446655440012', 'Jean-Baptiste Koffi', 'Plantation Koffi & Fils', 'Culture de mangues, avocat et agrumes. Agriculture familiale depuis 3 générations', 'Korhogo', 'Village de Sinématiali, Korhogo', '+225 01 23 45 67', 9.4580, -5.6297, false, 4.2, 8, now()),
('550e8400-e29b-41d4-a716-446655440033', '550e8400-e29b-41d4-a716-446655440013', 'Fatou Diabaté', 'Coopérative Femmes Unies', 'Coopérative de femmes productrices de riz et légumineuses', 'San-Pédro', 'Zone rurale San-Pédro', '+225 07 89 12 34', 4.7467, -6.6364, true, 4.6, 15, now()),
('550e8400-e29b-41d4-a716-446655440034', '550e8400-e29b-41d4-a716-446655440014', 'Olivier N''Guessan', 'Ferme Écologique Baoulé', 'Permaculture et agriculture biologique, formation d''agriculteurs', 'Daloa', 'Campement Daloa-Sud', '+225 05 56 78 90', 6.8775, -6.4503, true, 4.9, 25, now()),
('550e8400-e29b-41d4-a716-446655440035', '550e8400-e29b-41d4-a716-446655440015', 'Mariam Coulibaly', 'Les Jardins de l''Ouest', 'Maraîchage intensif et production de tubercules', 'Man', 'Route de Danané, Man', '+225 01 34 56 78', 7.4125, -7.5539, false, 4.1, 6, now()),
('550e8400-e29b-41d4-a716-446655440036', '550e8400-e29b-41d4-a716-446655440016', 'Pierre Brou', 'Plantation de l''Espoir', 'Cacao, café et cultures vivrières associées', 'Abengourou', 'Sous-préfecture d''Agnibilékrou', '+225 07 65 43 21', 6.7297, -3.4967, true, 4.4, 11, now()),
('550e8400-e29b-41d4-a716-446655440037', '550e8400-e29b-41d4-a716-446655440017', 'Aïcha Ouattara', 'Ferme Moderne du Nord', 'Élevage et agriculture mécanisée, céréales', 'Boundiali', 'Zone agricole Boundiali', '+225 05 11 22 33', 9.5208, -6.4886, false, 4.3, 9, now()),
('550e8400-e29b-41d4-a716-446655440038', '550e8400-e29b-41d4-a716-446655440018', 'Marcel Akissi', 'Ferme Côtière', 'Légumes de saison et fruits tropicaux près de la mer', 'Grand-Bassam', 'Village de Bongo, Grand-Bassam', '+225 01 44 55 66', 5.2510, -3.7380, true, 4.7, 20, now()),
('550e8400-e29b-41d4-a716-446655440039', '550e8400-e29b-41d4-a716-446655440019', 'Salimata Doumbia', 'Coopérative Gagnoa Bio', 'Agriculture biologique certifiée, transformation alimentaire', 'Gagnoa', 'Quartier Commerce, Gagnoa', '+225 07 77 88 99', 6.1319, -5.9506, true, 4.8, 22, now())
ON CONFLICT (id) DO NOTHING;

-- 4. Insérer des produits variés
INSERT INTO products (id, name, description, price, quantity, farmer_id, category_id, image_url, unit, stock, rating, reviews_count, is_organic, is_seasonal, free_delivery, farm_pickup, available_from, available_to, tags, created_at) VALUES
-- Légumes
('550e8400-e29b-41d4-a716-446655440050', 'Tomates cerises bio', 'Tomates cerises cultivées sans pesticides, goût sucré intense', 1500, 50, '550e8400-e29b-41d4-a716-446655440031', '550e8400-e29b-41d4-a716-446655440001', 'https://images.unsplash.com/photo-1592924357177-333f73b4c1dd?w=500', 'kg', 50, 4.8, 15, true, true, true, true, '2024-01-01', '2024-12-31', '["bio", "local", "frais"]', now()),
('550e8400-e29b-41d4-a716-446655440051', 'Aubergines violettes', 'Aubergines fraîches du jour, parfaites pour la cuisine ivoirienne', 800, 30, '550e8400-e29b-41d4-a716-446655440031', '550e8400-e29b-41d4-a716-446655440001', 'https://images.unsplash.com/photo-1659261200833-ec8761558cd5?w=500', 'kg', 30, 4.5, 8, false, true, false, true, '2024-01-01', '2024-12-31', '["frais", "local"]', now()),
('550e8400-e29b-41d4-a716-446655440052', 'Épinards verts', 'Épinards frais cueillis le matin même', 600, 25, '550e8400-e29b-41d4-a716-446655440034', '550e8400-e29b-41d4-a716-446655440001', 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500', 'botte', 25, 4.6, 12, true, true, true, true, '2024-01-01', '2024-12-31', '["bio", "frais", "vitamines"]', now()),
('550e8400-e29b-41d4-a716-446655440053', 'Choux pommés', 'Beaux choux bien formés, culture raisonnée', 400, 40, '550e8400-e29b-41d4-a716-446655440035', '550e8400-e29b-41d4-a716-446655440001', 'https://images.unsplash.com/photo-1518804147549-2163e60ffa90?w=500', 'pièce', 40, 4.2, 6, false, true, false, true, '2024-01-01', '2024-12-31', '["frais", "local"]', now()),
('550e8400-e29b-41d4-a716-446655440054', 'Ignames blanches', 'Ignames de première qualité, variété locale Kponan', 1200, 100, '550e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440001', 'https://images.unsplash.com/photo-1609501676725-7186f26afbc4?w=500', 'kg', 100, 4.9, 18, true, false, true, true, '2024-01-01', '2024-12-31', '["traditionnel", "bio", "tubercule"]', now()),

-- Fruits
('550e8400-e29b-41d4-a716-446655440055', 'Mangues Kent', 'Mangues juteuses et sucrées, maturité parfaite', 2000, 60, '550e8400-e29b-41d4-a716-446655440032', '550e8400-e29b-41d4-a716-446655440002', 'https://images.unsplash.com/photo-1553279768-865429fe4d23?w=500', 'kg', 60, 4.7, 22, false, true, true, true, '2024-03-01', '2024-08-31', '["juteux", "sucré", "tropical"]', now()),
('550e8400-e29b-41d4-a716-446655440056', 'Avocats Hass', 'Avocats crémeux, parfaits pour la consommation', 2500, 35, '550e8400-e29b-41d4-a716-446655440032', '550e8400-e29b-41d4-a716-446655440002', 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=500', 'kg', 35, 4.8, 16, true, false, false, true, '2024-01-01', '2024-12-31', '["bio", "crémeux", "nutritif"]', now()),
('550e8400-e29b-41d4-a716-446655440057', 'Oranges douces', 'Oranges juteuses du verger, riches en vitamine C', 1000, 80, '550e8400-e29b-41d4-a716-446655440032', '550e8400-e29b-41d4-a716-446655440002', 'https://images.unsplash.com/photo-1547514701-42782101795e?w=500', 'kg', 80, 4.4, 14, false, true, true, true, '2024-11-01', '2024-04-30', '["vitamine", "juteux", "frais"]', now()),
('550e8400-e29b-41d4-a716-446655440058', 'Papayes mûres', 'Papayes sucrées à point, excellentes pour la digestion', 1800, 25, '550e8400-e29b-41d4-a716-446655440038', '550e8400-e29b-41d4-a716-446655440002', 'https://images.unsplash.com/photo-1617112848923-cc2234396a8d?w=500', 'pièce', 25, 4.6, 10, true, false, false, true, '2024-01-01', '2024-12-31', '["bio", "digestion", "tropical"]', now()),

-- Céréales et légumineuses
('550e8400-e29b-41d4-a716-446655440059', 'Riz blanc parfumé', 'Riz de qualité premium, grains longs', 3500, 200, '550e8400-e29b-41d4-a716-446655440033', '550e8400-e29b-41d4-a716-446655440003', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500', 'sac 25kg', 8, 4.5, 20, false, false, true, false, '2024-01-01', '2024-12-31', '["céréale", "premium", "grains longs"]', now()),
('550e8400-e29b-41d4-a716-446655440060', 'Maïs séché', 'Maïs séché au soleil, idéal pour l''attiéké', 2800, 150, '550e8400-e29b-41d4-a716-446655440037', '550e8400-e29b-41d4-a716-446655440003', 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=500', 'sac 50kg', 3, 4.3, 8, false, false, false, true, '2024-01-01', '2024-12-31', '["traditionnel", "séché", "attiéké"]', now()),
('550e8400-e29b-41d4-a716-446655440061', 'Haricots niébé', 'Haricots locaux riches en protéines', 4000, 100, '550e8400-e29b-41d4-a716-446655440033', '550e8400-e29b-41d4-a716-446655440004', 'https://images.unsplash.com/photo-1596040165543-9eb9fc003fb9?w=500', 'kg', 100, 4.7, 13, true, false, false, true, '2024-01-01', '2024-12-31', '["bio", "protéines", "local"]', now()),

-- Épices et herbes
('550e8400-e29b-41d4-a716-446655440062', 'Basilic frais', 'Basilic aromatique cueilli du jardin', 500, 20, '550e8400-e29b-41d4-a716-446655440031', '550e8400-e29b-41d4-a716-446655440006', 'https://images.unsplash.com/photo-1618375569909-3c8616cf727e?w=500', 'botte', 20, 4.9, 7, true, true, false, true, '2024-01-01', '2024-12-31', '["bio", "aromatique", "frais"]', now()),
('550e8400-e29b-41d4-a716-446655440063', 'Gingembre bio', 'Gingembre frais aux propriétés médicinales', 1500, 40, '550e8400-e29b-41d4-a716-446655440039', '550e8400-e29b-41d4-a716-446655440006', 'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=500', 'kg', 40, 4.8, 12, true, false, true, true, '2024-01-01', '2024-12-31', '["bio", "médicinal", "épice"]', now())
ON CONFLICT (id) DO NOTHING;

-- 5. Créer quelques commandes de test
INSERT INTO orders (id, buyer_id, total, status, delivery_method, delivery_address, payment_method, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440070', '550e8400-e29b-41d4-a716-446655440020', 4500, 'delivered', 'delivery', 'Cocody, Abidjan', 'card', now() - interval '5 days'),
('550e8400-e29b-41d4-a716-446655440071', '550e8400-e29b-41d4-a716-446655440021', 6800, 'pending', 'pickup', NULL, 'cash', now() - interval '2 days'),
('550e8400-e29b-41d4-a716-446655440072', '550e8400-e29b-41d4-a716-446655440022', 3200, 'processing', 'delivery', 'Marcory, Abidjan', 'transfer', now() - interval '1 day')
ON CONFLICT (id) DO NOTHING;

-- 6. Créer des éléments de commande
INSERT INTO order_items (id, order_id, product_id, quantity, unit_price) VALUES
('550e8400-e29b-41d4-a716-446655440080', '550e8400-e29b-41d4-a716-446655440070', '550e8400-e29b-41d4-a716-446655440050', 3, 1500),
('550e8400-e29b-41d4-a716-446655440081', '550e8400-e29b-41d4-a716-446655440071', '550e8400-e29b-41d4-a716-446655440055', 2, 2000),
('550e8400-e29b-41d4-a716-446655440082', '550e8400-e29b-41d4-a716-446655440071', '550e8400-e29b-41d4-a716-446655440056', 1, 2500),
('550e8400-e29b-41d4-a716-446655440083', '550e8400-e29b-41d4-a716-446655440072', '550e8400-e29b-41d4-a716-446655440054', 2, 1200)
ON CONFLICT (id) DO NOTHING;

-- 7. Ajouter quelques avis
INSERT INTO reviews (id, product_id, user_id, rating, comment, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440090', '550e8400-e29b-41d4-a716-446655440050', '550e8400-e29b-41d4-a716-446655440020', 5, 'Excellentes tomates, très savoureuses !', now() - interval '3 days'),
('550e8400-e29b-41d4-a716-446655440091', '550e8400-e29b-41d4-a716-446655440055', '550e8400-e29b-41d4-a716-446655440021', 4, 'Mangues bien mûres et juteuses', now() - interval '1 day'),
('550e8400-e29b-41d4-a716-446655440092', '550e8400-e29b-41d4-a716-446655440054', '550e8400-e29b-41d4-a716-446655440022', 5, 'Ignames de très bonne qualité, comme à la maison !', now() - interval '2 days')
ON CONFLICT (id) DO NOTHING;

-- 8. Ajouter quelques messages de démonstration
INSERT INTO farmer_messages (id, sender_id, recipient_id, subject, content, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440100', '550e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440010', 'Question sur les ignames', 'Bonjour, j''aimerais savoir si vous avez des ignames disponibles pour la semaine prochaine ?', now() - interval '1 day'),
('550e8400-e29b-41d4-a716-446655440101', '550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440020', 'Re: Question sur les ignames', 'Bonjour Martin, oui j''ai encore du stock d''ignames fraîches. Vous pouvez passer commande !', now() - interval '12 hours')
ON CONFLICT (id) DO NOTHING;

-- 9. Ajouter des favoris
INSERT INTO favorites (id, user_id, product_id, farmer_id, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440110', '550e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440050', NULL, now()),
('550e8400-e29b-41d4-a716-446655440111', '550e8400-e29b-41d4-a716-446655440020', NULL, '550e8400-e29b-41d4-a716-446655440031', now()),
('550e8400-e29b-41d4-a716-446655440112', '550e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440055', NULL, now())
ON CONFLICT (id) DO NOTHING;
