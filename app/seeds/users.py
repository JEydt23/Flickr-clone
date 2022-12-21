from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', first_name="Demo", last_name="Lition", profile_picture="https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png", bio = "This is the Demo login account. This account is used for testing purposes only.")
    marnie = User(
        username='Marnie', email='marnie@aa.io', password='password', first_name="Marnie", last_name="Smith", profile_picture="https://cdn.britannica.com/35/233235-050-8DED07E3/Pug-dog.jpg", bio = "I like to take pictures and share them with the world!")
    bobbie = User(
        username='Bobby', email='bobbie@aa.io', password='password', first_name="Bobbie", last_name="Brown", profile_picture="https://people.com/thmb/YMmkyqr6PrKW_xDzZdBgrbpb0uE=/400x262/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/bobby-brown28-2d50fbbcbcc04a17993c50396fb8c45e.jpg", bio = "Robert Barisford Brown is an American singer, songwriter and dancer. Brown, alongside frequent collaborator Teddy Riley, is noted as one of the pioneers of new jack swing: a fusion of hip hop and R&B.")

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
