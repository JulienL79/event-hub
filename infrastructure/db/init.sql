-- ============================================================
--  EventHub - Schéma de Base de Données (PostgreSQL)
-- ============================================================

-- Activer l’extension UUID si non active
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
--  Table : user
-- ============================================================
CREATE TABLE "user" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'participant' 
        CHECK (role IN ('participant','organizer','admin')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    is_email BOOLEAN NOT NULL DEFAULT TRUE,
    is_sms BOOLEAN NOT NULL DEFAULT TRUE,
    is_in_app BOOLEAN NOT NULL DEFAULT TRUE,
    language VARCHAR(10) NOT NULL DEFAULT 'fr',
    theme VARCHAR(20) NOT NULL DEFAULT 'light'
);

-- ============================================================
--  Table : category
-- ============================================================
CREATE TABLE category (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- ============================================================
--  Table : category_preference
-- ============================================================
CREATE TABLE category_preference (
    user_id UUID NOT NULL,
    category_id UUID NOT NULL,
    PRIMARY KEY (user_id, category_id),
    FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
);

-- ============================================================
--  Table : location
-- ============================================================
CREATE TABLE location (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    city VARCHAR(100),
    country VARCHAR(100),
    capacity INT,
    equipments TEXT,
    accessibility BOOLEAN NOT NULL DEFAULT FALSE
);

-- ============================================================
--  Table : event
-- ============================================================
CREATE TABLE event (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organizer_id UUID NOT NULL,
    location_id UUID NOT NULL,
    category_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date_start TIMESTAMP NOT NULL,
    date_end TIMESTAMP NOT NULL,
    capacity INT NOT NULL,
    price_min DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'draft'
        CHECK (status IN ('draft','published','cancelled')),

    FOREIGN KEY (organizer_id) REFERENCES "user"(id),
    FOREIGN KEY (location_id) REFERENCES location(id),
    FOREIGN KEY (category_id) REFERENCES category(id)
);

-- ============================================================
--  Table : ticket_type
-- ============================================================
CREATE TABLE ticket_type (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quota INT NOT NULL,

    FOREIGN KEY (event_id) REFERENCES event(id) ON DELETE CASCADE
);

-- ============================================================
--  Table : booking
-- ============================================================
CREATE TABLE booking (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    event_id UUID NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending','paid','cancelled','refunded')),
    total_amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'EUR',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES "user"(id),
    FOREIGN KEY (event_id) REFERENCES event(id)
);

-- ============================================================
--  Table : ticket
-- ============================================================
CREATE TABLE ticket (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL,
    ticket_type_id UUID NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    qr_code_path VARCHAR(255),
    status VARCHAR(20) NOT NULL DEFAULT 'valid'
        CHECK (status IN ('valid','used','cancelled')),

    FOREIGN KEY (booking_id) REFERENCES booking(id) ON DELETE CASCADE,
    FOREIGN KEY (ticket_type_id) REFERENCES ticket_type(id)
);

-- ============================================================
--  Table : payment
-- ============================================================
CREATE TABLE payment (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL,
    stripe_payment_intent_id VARCHAR(255),
    stripe_charge_id VARCHAR(255),
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'EUR',
    status VARCHAR(20) NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending','succeeded','failed','refunded')),
    payment_method VARCHAR(50),
    paid_at TIMESTAMP,
    failure_reason TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (booking_id) REFERENCES booking(id)
);

-- ============================================================
--  Table : refund
-- ============================================================
CREATE TABLE refund (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    payment_id UUID NOT NULL,
    stripe_refund_id VARCHAR(255),
    amount DECIMAL(10,2) NOT NULL,
    reason TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending','completed','failed')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (payment_id) REFERENCES payment(id)
);

-- ============================================================
--  Table : invoice
-- ============================================================
CREATE TABLE invoice (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL,
    payment_id UUID,
    invoice_number VARCHAR(50) NOT NULL,
    issued_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'EUR',
    status VARCHAR(20) NOT NULL DEFAULT 'issued'
        CHECK (status IN ('issued','paid','cancelled','refunded','pending')),
    pdf_url VARCHAR(255),

    billing_name VARCHAR(255) NOT NULL,
    billing_email VARCHAR(255) NOT NULL,
    billing_address VARCHAR(255),
    billing_city VARCHAR(100),
    billing_postcode VARCHAR(20),
    billing_country VARCHAR(100),
    billing_vat_number VARCHAR(50),

    event_title VARCHAR(255) NOT NULL,
    event_start_date TIMESTAMP NOT NULL,
    event_end_date TIMESTAMP NOT NULL,
    event_location_name VARCHAR(255),
    organizer_name VARCHAR(255),

    FOREIGN KEY (booking_id) REFERENCES booking(id),
    FOREIGN KEY (payment_id) REFERENCES payment(id)
);

-- ============================================================
--  Table : review
-- ============================================================
CREATE TABLE review (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL,
    user_id UUID NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (event_id) REFERENCES event(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE
);
