from app.models import db, Photo, environment, SCHEMA


def seed_photos():
    photo1 = Photo(
        id='1', user_id="1", title="A Walk in the Park", description="A moment in time captured in NYC's Central Park", file_path="https://upload.wikimedia.org/wikipedia/commons/0/05/Southwest_corner_of_Central_Park%2C_looking_east%2C_NYC.jpg", tags="Nature"
    )
    photo2 = Photo(
        id='2', user_id="2", title="People of NYC", description="Surrounded by millions, but still alone", file_path="https://i0.wp.com/blog2.roomiapp.com/wp-content/uploads/2017/05/living-alone-in-NYC.jpeg", tags="City"
    )
    photo3 = Photo(
        id='3', user_id="3", title="Man's Best Friend", description="Dogs are truly man's best friend. Loyal until the end.", file_path="https://image.petmd.com/files/styles/863x625/public/CANS_dogsmiling_379727605.jpg", tags="Animals"
    )
    photo4= Photo(
        id='4', user_id="1", title="Looks Like Film", description="New York City after a rainstorm. The photo looks like a scene from a movie.", file_path="https://www.lookslikefilm.com/wp-content/uploads/2020/02/georgios-delimosis-kodak-ultra-max-400-green-tweaked-with-a-combination-of-photoshop-and-lightroom-to-create-the-cinematic-look-www.delimosis.com_.jpg", tags="City"
    )
    photo5= Photo(
        id='5', user_id="2", title="Purple Skies", description="A beautiful scene where mountains take on the purple and red from the sky.", file_path="https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg", tags="Nature"
    )
    photo6= Photo(
        id='6', user_id="3", title="Lousiana Bend", description="Another nature photo, sorry I am not more creative with these seeders.", file_path="https://byways.louisianatravel.com/sites/default/files/styles/16_9_l/public/2021-02/20120608_toledo-36.jpg", tags="Nature"
    )
    photo7= Photo(
        id='7', user_id="1", title="Phoenix", description="A photo from Phoenix, Arizona.", file_path="https://assets.simpleviewinc.com/simpleview/image/fetch/c_fill,q_75/http://res.cloudinary.com/simpleview/image/upload/v1447793849/clients/phoenix/50e9a589e66c7-ApacheTrip489_99160cbe-ea69-4a7f-8872-bdfcfd67d400.jpg", tags="Nature"
    )
    photo8= Photo(
        id='8', user_id="2", title="City Palm Trees", description="Turn up the 80s tunes while driving your convertible.", file_path="https://media.tacdn.com/media/attractions-splice-spp-674x446/07/32/00/f8.jpg", tags="City"
    )
    photo9= Photo(
        id='9', user_id="3", title="The Barn Life", description="Simple living ain't so simple.", file_path="https://www.scenic.org/wp-content/uploads/2021/04/Alley-Spring-1-1024x768.jpg", tags="Home"
    )
    photo10= Photo(
        id='10', user_id="1", title="All Aboard!", description="Train switches tracks.", file_path="https://assets.simpleviewinc.com/simpleview/image/fetch/q_75/https://assets.simpleviewinc.com/simpleview/image/upload/crm/newyorkstate/ADK_AdirondackScenicRR_Fall_-NYSDED_F5BE0124-AFA0-EEE0-12B4CE618EC6A288-f5bdff379c3519b_f5be0181-9f4b-f91c-65941970d74c886d.jpg", tags="Trains"
    )


    db.session.add(photo1)
    db.session.add(photo2)
    db.session.add(photo3)
    db.session.add(photo4)
    db.session.add(photo5)
    db.session.add(photo6)
    db.session.add(photo7)
    db.session.add(photo8)
    db.session.add(photo9)
    db.session.add(photo10)

    db.session.commit()


def undo_photos():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.photos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM photos")

    db.session.commit()
