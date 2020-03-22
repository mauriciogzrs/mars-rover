from mars import Mars


def main():
    try:
        m = Mars()

        r1 = m.add_rover("spirit")
        r2 = m.add_rover("cUriOsITy", 5, 5, "e")

        r1.right()
        r1.forwards(2)
        r1.left(3)
        r1.forwards(4)
        r1.right()
        r1.backwards(3)

        r2.command("xrzfzzzf!@#frflfrrbfrf123flbbb")

        r1.done()
        r2.done()

        m.print_grid()
    except Exception as e:
        print(e)


if __name__ == "__main__":
    main()
