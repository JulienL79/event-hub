ALTER TABLE "bookings" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "invoices" ADD COLUMN "organizer_name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "invoices" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "invoices" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "locations" ADD COLUMN "equipments" text NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "tickets" ADD COLUMN "qr_code_path" varchar(255);--> statement-breakpoint
ALTER TABLE "tickets" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "tickets" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "stripe_payment_intent_id" varchar(255);--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "stripe_charge_id" varchar(255);--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "currency" varchar(10) DEFAULT 'EUR' NOT NULL;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "payment_method" varchar(50);--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "paid_at" timestamp;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "failure_reason" text;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "reattendait" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "refunds" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;