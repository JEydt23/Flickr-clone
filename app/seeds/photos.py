from app.models import db, Photo, environment, SCHEMA

def seed_photos():
    photo1 = Photo(
        id='1', user_id="1", title="A Walk in the Park", description="A moment in time captured in NYC's Central Park", file_path = "https://upload.wikimedia.org/wikipedia/commons/0/05/Southwest_corner_of_Central_Park%2C_looking_east%2C_NYC.jpg", date_uploaded="2022-01-01", tags="Nature"
    )
    photo2 = Photo(
        id='2', user_id="2", title="People of NYC", description="Surrounded by millions, but still alone", file_path = "https://i0.wp.com/blog2.roomiapp.com/wp-content/uploads/2017/05/living-alone-in-NYC.jpeg", date_uploaded="2022-01-01", tags="City"
    )
    photo3 = Photo(
        id='3', user_id="3", title="Man's Best Friend", description="Dogs are truly man's best friend. Loyal until the end.", file_path = "https://image.petmd.com/files/styles/863x625/public/CANS_dogsmiling_379727605.jpg", date_uploaded="2022-01-01", tags="Animals"
    )

    db.session.add(photo1)
    db.session.add(photo2)
    db.session.add(photo3)

    db.session.commit()

def undo_photos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.photos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM photos")

    db.session.commit()
